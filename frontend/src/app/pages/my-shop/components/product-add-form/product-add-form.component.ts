import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ProductsService} from '../../services/products.service';
import {ToastrService} from 'ngx-toastr';
import {ProductCategory} from "../../../../models/Category";

@Component({
    selector: 'vex-product-add-form',
    templateUrl: './product-add-form.component.html',
    styleUrls: ['./product-add-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductAddFormComponent implements OnInit {

    formGroup: FormGroup;
    @Output() createdNewProduct = new EventEmitter();

    constructor(private fb: FormBuilder, private productsService: ProductsService, private toaster: ToastrService) {
    }

    ngOnInit() {
        this.formGroup = this.fb.group({
            name: [null, Validators.required],
            description: [],
            price: [null,
                Validators.compose(
                    [
                        Validators.required,
                        Validators.pattern('^[0-9]\\d*(\\.\\d{1,2})?$')
                    ]
                )],
            inStock: [true, null],
            category: [null, Validators.required],
            image: ['']
        });
    }

    onChange(event) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            this.formGroup.get('image').setValue(file);
        }
    }

    create() {
        debugger
        this.productsService.add({
            name: this.formGroup.value.name,
            price: parseFloat(this.formGroup.value.price),
            description: this.formGroup.value.description,
            inStock: this.formGroup.value.inStock,
            image: this.formGroup.value.image,
            category: this.formGroup.value.category
        })
            .then(
                () => {
                    this.toaster.success('המוצר נשמר בהצלחה');
                    this.createdNewProduct.emit();
                },
                (failRes) => {
                    if (failRes.status === 409) {
                        this.toaster.error('product wasn\'t created, please try different name', 'Name already exists!');
                        return;
                    }

                    if (failRes.status === 405) {
                        this.toaster.error('You are not allowed to add products', 'Not an admin!');
                        return;
                    }

                    this.toaster.error(`product wasn\'t created, please try again`, 'Something went wrong!');
                }
            );
    }

    changedCategory(category: ProductCategory) {
        this.formGroup.get('category').setValue(category.id);
    }
}