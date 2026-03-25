import {
  Component,
  Output,
  EventEmitter,
  inject,
  input,
  signal,
  computed,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CategoryService, CategoryResponse } from '../../services/category.service';
import { ToastService } from '../../../../../core/services/toast.service';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css',
})
export class CategoryFormComponent {
  @Output() close = new EventEmitter<void>();
  /** Emitted after a successful create or update — parent should reload data */
  @Output() saved = new EventEmitter<void>();

  mode = input<string>('create');
  category = input<any | null>(null);

  form: FormGroup;

  titleModal = computed(() =>
    this.mode() === 'edit' ? 'Edit Category' : 'New Category',
  );

  /**
   * Level-2 (domain) categories — the only valid parent choices.
   * Must be a signal so that parentOptions() re-computes when the HTTP call resolves.
   */
  private readonly level2Categories = signal<CategoryResponse[]>([]);

  parentOptions = computed(() => {
    const cat = this.category();
    const all = this.level2Categories();
    return this.mode() === 'edit' && cat
      ? all.filter(c => c.id !== cat.id)
      : all;
  });

  private readonly fb = inject(FormBuilder);
  private readonly categoryService = inject(CategoryService);
  private readonly toastService = inject(ToastService);

  constructor() {
    // parentId is always required — only leaf (level-3) categories can be created
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      parentId: [null, [Validators.required]],
    });

    // Load valid parent options (level-2 only) — .set() triggers computed() re-evaluation
    this.categoryService.getLevel2Categories().subscribe({
      next: (res) => this.level2Categories.set(res.data),
      error: () => this.toastService.error('Failed to load parent categories.'),
    });

    effect(() => {
      const cat = this.category();
      if (cat) {
        this.form.patchValue({ name: cat.name, parentId: cat.parentId ?? null });
      } else {
        this.form.reset({ name: '', parentId: null });
      }
    });
  }

  onSubmit(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.mode() === 'create') {
      this.categoryService.createCategory(this.form.value).subscribe({
        next: () => {
          this.toastService.success('Category created successfully!');
          this.saved.emit();
          this.close.emit();
        },
        error: (err) => {
          const msg = err?.error?.resolvedMessage ?? err?.error?.message ?? 'Failed to create category.';
          this.toastService.error(msg);
        },
      });
    } else {
      this.categoryService.updateCategory(this.category().id, this.form.value).subscribe({
        next: () => {
          this.toastService.success('Category updated successfully!');
          this.saved.emit();
          this.close.emit();
        },
        error: (err) => {
          const msg = err?.error?.resolvedMessage ?? err?.error?.message ?? 'Failed to update category.';
          this.toastService.error(msg);
        },
      });
    }
  }

  onCancel(): void {
    this.close.emit();
  }
}
