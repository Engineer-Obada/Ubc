import contactData from '../../db/apps/contact/contactList';
import mock from '../../MockConfig';

import warehouseList from '@crema/services/db/warehouse/warehouseList';
import productData from '@crema/services/db/product/productData'
import customerList from '@crema/services/db/customer/customerList';

const api = 'api'

let customerData = customerList;

mock.onGet('/api/customers').reply(()=>{
  return[200,customerData]
})

mock.onPost(`/${api}/customer/link`).reply((request)=>{
  const customerid = JSON.parse(request.data);
   customerData.map(customer =>
    customer.id === customerid.id ?   customer.status="Linked"  : customer
  );
  return [200,customerid]
  })
mock.onPost(`/${api}/customer/reject`).reply((request)=>{
  const customerid = JSON.parse(request.data);
    customerData.map(customer =>
    customer.id === customerid.id ?   customer.status="Rejected"  : customer
  );
  return [200,customerid]
  })



mock.onPost('/api/customer/delete').reply((request)=>{
  const productId = request.data;

  customerData = customerData.filter((product)=>
    productId != product.id
  );
console.log('customerData',customerData);

  return [200,productId]
})


mock.onPut(`/api/customer/accountAvailable`).reply((request)=>{
  const customerid = JSON.parse(request.data);
  customerData.map(customer =>
    customer.id === customerid.contactIds[0] ?   customer.accountStatus=customerid.status  : customer
  );

  return [200,customerid]
  })
/***********************************************/
let productsData = productData.productItems;

// mock.onPost(`/${api}/product/add`).reply((request)=>{
// const {product} = JSON.parse(request.data);
// productsData = [product,...productsData];
// return [200,product]
// })
// mock.onGet('http://192.168.43.215:8080/api/product').reply((request)=>{
//   console.log('reeeques', request);
//   return[200,productsData]
// })

mock.onPost('/api/product/delete').reply((request)=>{
  const productId = request.data;

  productsData = productsData.filter((product)=>
    productId != product.id
  )
  return [200,productsData]
})

mock.onPut('/api/product/update').reply((request)=>{
  const {product} = JSON.parse(request.data);
  productsData = productsData.map((item)=>
    item.id === product.id ? product : item )
  return[200, product]
})
/****************************************************************/
let categoryData = productData.categoryData;

mock.onPost(`/${api}/category/add`).reply((request)=>{
const {category} = JSON.parse(request.data);
categoryData = [category,...categoryData];
return [200,category]
})
mock.onGet('/api/category').reply(()=>{
  return[200,categoryData]
})

mock.onPost(`/${api}/category/delete`).reply((request)=>{

  const categoryId = request.data;

  categoryData = categoryData.filter(
    (category)=>
    categoryId !=category.id
  )
  return [200,categoryData]
})

/*************************************************/
let warehouseData = warehouseList;

mock.onGet('/api/warehouse').reply((config) => {
  const params = config.params;
  const index = params.page * 15;
  const count = warehouseData.length;
  const data =
    warehouseData.length > 15
      ? warehouseData.slice(index, index + 15)
      : warehouseData;
  return [200, { data, count }];
});

mock.onPost('/api/warehouse/delete').reply((request) => {
  const { contactIds, page } = JSON.parse(request.data);
  warehouseData = warehouseData.filter(
    (contact) => !contactIds.includes(contact.id)
  );
  const index = page * 15;
  const count = warehouseData.length;
  const data =
    warehouseData.length > 15
      ? warehouseData.slice(index, index + 15)
      : warehouseData;
  return [200, { data, count }];
});


mock.onPost('/api/warehouse/add').reply((request) => {
  const  warehouse  = JSON.parse(request.data);
  warehouseData = [ warehouse.contact, ...warehouseData];
  return [200, warehouse];
});

mock.onPut('/api/warehouse/update').reply((request) => {
  const { contact } = JSON.parse(request.data);
  warehouseData = warehouseData.map((item) =>
    item.id === contact.id ? contact : item
  );
  return [200, contact];
});

mock.onGet('/api/warehouse/contact/').reply((config) => {
  const params = config.params;
  const response = warehouseData.find(
    (contact) => contact.id === parseInt(params.id)
  );
  return [200, response];
});
/********************************/



let contactList = contactData;

// mock.onPost(`/api/employee/add`).reply((request)=>{
// const {employee} = JSON.parse(request.data);
// contactList = [employee,...contactList];
// return [200,employee]
// })
// mock.onGet('/api/employee').reply(()=>{
//   return[200,contactList]
// })
mock.onPut(`api/employee/update/accountStatus`).reply((request)=>{
  const customerid = JSON.parse(request.data);
  contactList.map(customer =>
    customer.id === customerid.contactIds[0] ?   customer.accountStatus=customerid.status  : customer
  );

  return [200,customerid]
  })

// mock.onPost('/api/employee/delete').reply((request)=>{
//   const productId = request.data;

//   contactList = contactList.filter((product)=>
//     productId != product.id
//   )
//   return [200,contactList]
// })

mock.onPut('/api/employee/update').reply((request)=>{
  const {employee} = JSON.parse(request.data);
  contactList = contactList.map((item)=>
    item.id === employee.id ? employee : item )
  return[200, employee]
})
