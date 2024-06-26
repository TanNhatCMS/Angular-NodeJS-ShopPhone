const getEle = (id) => document.getElementById(id);
const resetForm = (formId) => getEle(formId).reset();

import {CustomModal, Helper} from './utils.js';
import {Services} from './ProductService.js';
import {Validator} from './validator.js';
import {Product} from './product.js';

const helper = new Helper();
const service = new Services();
const validator = new Validator();

const renderList = async () => {
    try {
        let data;
        await service.getProducts().then(
            (res) => {
                data = res.products;
                let content = '';
                data.map((ele, index) => {
                    content += `
        <tr>
            <td>${index + 1}</td>
            <td><strong>${ele.name}</strong></td>
            <td>${ele.price}</td>
            <td style="text-align: center"><img src=${ele.img} alt="phone-img" width="150" height="150"></td>
            <td>${ele.desc}</td>
            <td style="text-align: center">
                <button class="btn my-3 me-1" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick ="btnEdit('${ele.id}')"  id='btnEdit'>
                    Chỉnh sửa<i class="fa fa-pencil-square ms-2"></i>
                </button>
                <button class="btn " onclick ="btnDelete('${ele.id}')" id='btnDelete'>
                Xóa<i class="fa fa-trash ms-2"></i>
                </button>
            </td>
        </tr>`;
                });
                getEle('tablePhone').innerHTML = content;
            }
        );


    } catch (error) {
        console.error(error);
    }
};

window.onload = async () => {
    try {
        await renderList();
    } catch (error) {
        console.error(error);
    }
};

getEle('addPhoneForm').onclick = () => {
    resetForm('formPhone');
    helper.clearTextBoxes();
    getEle('btnUpdate').style.display = 'none';
    getEle('btnAddPhone').style.display = 'inline-block';
};

getEle('btnAddPhone').onclick = async () => {
    try {
        const res = await service.getProducts();
        if (!validator.isValid(res.products)) return;
        const inputs = helper.getInputValues();
        const product = new Product('', ...inputs);
        delete product.id;
        const req = await service.addProduct(product);
        if(req.success){
            await renderList();
            CustomModal.alertSuccess('Thêm sản phẩm thành công');
            $('#exampleModal').modal('hide');
        }else {
            CustomModal.alertError('Thêm sản phẩm thất bại',  req.message);
        }
    } catch (error) {
        console.error(error);
    }
};

window.btnDelete = async (id) => {
    try {
        const req = await CustomModal.alertDelete(`Sản phẩm này sẽ bị xóa, bạn không thể hoàn tác hành động này`);
        if (req.isConfirmed) {
            const res = await service.deleteProduct(id);
            if(res.success){
                await renderList();
                CustomModal.alertSuccess('Xóa sản phẩm thành công');
            }else {
                CustomModal.alertError('Xóa sản phẩm thất bại', res.message);
            }
        }
    } catch (error) {
        console.error(error);
    }
};

window.btnEdit = async (id) => {
    helper.clearTextBoxes();
    try {
        getEle('btnUpdate').style.display = 'inline-block';
        getEle('btnAddPhone').style.display = 'none';
        const res = await service.getProductById(id);
        const data = res.product;
        delete data.id;
        const arrObjValue = Object.values(data);
        helper.fillInputs(arrObjValue);
        getEle('btnUpdate').onclick = async () => {
            const res = await service.getProducts();
            if (!validator.isValid( res.products, true)) return;
            const inputs = helper.getInputValues();
            const product = new Product(id, ...inputs);
            const req = await service.updateProduct(product);
            if(req.success){
                await renderList();
                CustomModal.alertSuccess('Cập nhật sản phẩm thành công');
                $('#exampleModal').modal('hide');
            }else{
                CustomModal.alertError('Cập nhật sản phẩm thất bại', req.message);
            }
        };
    } catch (error) {
        console.error(error);
    }
};
