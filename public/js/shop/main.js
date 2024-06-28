const getEle = (id) => document.getElementById(id);

import {Services} from './ProductService.js';
import {CartItem} from './cartItem.js';
import {Product} from './product.js';

const service = new Services();
let cart = [];
const renderItem = (phone) => {
  return ` <div class="col-lg-3 col-md-6">
  <div class="card text-black h-100">
  <div class="content-overlay"></div>
    <img src=${phone.img} class="card-img" alt="${phone.name}" />
    <div class="content-details fadeIn-top">
    <h3 class ='pb-5'>Thông số kỹ thuật</h3>
          <div class="d-flex justify-content-start py-1">
        <span class='text-light'><b>Màn hình:</b></span>
        <span class='text-light'>&nbsp ${phone.screen}</span>
      </div>
      <div class="d-flex justify-content-start py-1">
        <span class='text-light'><b>Camera sau:</b> ${phone.backCamera}</span>
      </div>
      <div class="d-flex justify-content-start py-1">
        <span class='text-light'><b>Camera phía trước:</b> ${phone.frontCamera}</span>
      </div>

      <p class = 'pt-5'><u>Bấm vào đây để biết thêm chi tiết</u></p>
    </div>
    <div class="card-body">
      <div class="text-center">
        <h5 class="card-title pt-3">${phone.name}</h5>
        <span class="text-muted mb-2">${phone.price}₫</span>
        <span class="text-danger"><s>${Number(phone.price) + 100000}₫</s></span>
      </div>
      <div class="mt-3 brand-box text-center">
        <span>${phone.type}</span>
      </div>
      <div class="d-flex justify-content-start pt-3">
        <span><b>Mô tả:</b> ${phone.desc}</span>
      </div>
      <div class="d-flex justify-content-between pt-3">
        <div class="text-warning">
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
        </div>
        <span class = 'text-success'><b>Còn hàng</b></span>
      </div>
      <button type="button" class="btn btn-block w-50" onclick ="btnAddToCart('${phone.id
    }')">Thêm vào giỏ hàng</button>
    </div>
  </div>
</div>`;
};
const renderCartItem = (item) => {
  return `<div class="product">
  <div class="product__1">
    <div class="product__thumbnail">
      <img src=${item.product.img} 
        alt="Italian Trulli">
    </div>
    <div class="product__details">
      <div style="margin-bottom: 8px;"><b>${item.product.name}</b></div>
      <div style="font-size: 90%;">Màn hình: <span class="tertiary">${item.product.screen
      }</span></div>
      <div style="font-size: 90%;">Camera sau: <span class="tertiary">${item.product.backCamera
      }</span></div>
      <div style="font-size: 90%;">Camera phía trước: <span class="tertiary">${item.product.frontCamera
      }</span></div>
      <div style="margin-top: 8px;"><a href="#!" onclick ="btnRemove('${item.product.id}')">Xoá</a></div>
    </div>
  </div>
  <div class="product__2">
    <div class="qty">
      <span><b>Số lượng:</b> </span> &nbsp &nbsp
      <span class="minus bg-dark" onclick ="btnMinus('${item.product.id}')">-</span>
      <span class="quantityResult mx-2">${item.quantity}</span>
      <span class="plus bg-dark" onclick ="btnAdd('${item.product.id}')">+</span>
    </div>
    <div class="product__price"><b>${item.quantity * item.product.price}₫</b></div>
  </div>
</div>`;
};
const renderList = (data) => {
  getEle('phoneList').innerHTML = data.map((data) => renderItem(data)).join('');
};

const renderCart = (cartItems) => {
  getEle('cartList').innerHTML = cartItems.map((item) => renderCartItem(item)).join('');

  const cartCount = cartItems.reduce((total, ele) => total + ele.quantity, 0);
  const subTotal = calculateSubTotal(cartItems);
  const shipping = subTotal > 0 ? 10 : 0;

  getEle('cartCount').innerHTML = cartCount;
  getEle('shipping').innerHTML =  shipping + '₫';
  getEle('subTotal').innerHTML =  subTotal + '₫';
  getEle('tax').innerHTML =  Math.floor(subTotal * 0.1) + '₫';
  getEle('priceTotal').innerHTML = Math.floor(subTotal * 1.1 + shipping) + '₫';
};

const calculateSubTotal = (cartItems) => {
  return cartItems.reduce((total, ele) => total + ele.product.price * ele.quantity, 0);
};

const findItemById = (cartItems, id) => {
  return cartItems.find((ele) => ele.product.id === id);
};

window.onload = async () => {
  await service.getProducts().then((data) => renderList(data.products));
  cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
  renderCart(cart);
};

getEle('selectList').onchange = async () => {
  let data;
  await service.getProducts().then((res) => data=res.products);
  const selectValue = getEle('selectList').value;
  let filterData =
    selectValue === 'all' ? data : data.filter((ele) => ele.type === selectValue);
  renderList(filterData);
};

window.btnAddToCart = async (productId) => {
  let data;
  await service.getProductById(productId).then((res) => data=res.product);
  const { id, name, price, screen, backCamera, frontCamera, img, desc, type } = data;
  const product = new Product(
    id,
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    desc,
    type
  );
  const newCartItem = new CartItem(product, 1);
  let cartItem = findItemById(cart, newCartItem.product.id);
  !cartItem ? cart.push(newCartItem) : cartItem.quantity++;
  renderCart(cart);
  localStorage.setItem('cart', JSON.stringify(cart));
};

window.btnAdd = (id) => {
  let cartItem = findItemById(cart, id);
  if (cartItem) cartItem.quantity++;
  renderCart(cart);
  localStorage.setItem('cart', JSON.stringify(cart));
};

window.btnMinus = (id) => {
  let cartItem = findItemById(cart, id);
  if (cartItem) cartItem.quantity--;
  cart = cart.filter((ele) => ele.quantity !== 0);
  renderCart(cart);
  localStorage.setItem('cart', JSON.stringify(cart));
};

window.btnRemove = (id) => {
  cart = cart.filter((ele) => ele.product.id !== id);
  renderCart(cart);
  localStorage.setItem('cart', JSON.stringify(cart));
};

window.emptyCart = () => {
  cart = [];
  renderCart(cart);
  localStorage.setItem('cart', JSON.stringify(cart));
};

window.payNow = () => {
  if (cart.length > 0) {
    Swal.fire({
      icon: 'success',
      title: 'Đơn hàng của bạn đã hoàn tất',
      showConfirmButton: false,
      timer: 1500,
    });
    emptyCart();
    localStorage.setItem('cart', JSON.stringify(cart));
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Ối...',
      text: 'Giỏ của bạn trống trơn',
    });
  }
};
