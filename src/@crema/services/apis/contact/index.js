import contactData from '../../db/apps/contact/contactList';
import mock from '../../MockConfig';
import folderList from '../../db/apps/contact/folderList';
import roleList from '../../db/apps/contact/roleList';
import warehouseList from '@crema/services/db/warehouse/warehouseList';
import productData from '@crema/services/db/product/productData'



let categoryData = productData.categoryData;

mock.onPost('/api/category/compose').reply((request)=>{
const {category} = JSON.parse(request.data);
categoryData = [category,...categoryData];
console.log("categoryData",categoryData);
return [200,category]
})
mock.onGet('/api/category').reply(()=>{
  console.log("yes");
  return[200,categoryData]
})


/*************************************************/
let warehouseData = warehouseList;

mock.onGet('/api/warehouse/list').reply((config) => {
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


mock.onPost('/api/warehouse/compose').reply((request) => {
  const  warehouse  = JSON.parse(request.data);
  warehouseData = [ warehouse.contact, ...warehouseData];
  return [200, warehouse];
});

mock.onPut('/api/warehouse/contact/').reply((request) => {
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

mock.onGet('/api/contactApp/folders/list').reply(200, folderList);

mock.onGet('/api/ubc/list').reply(200, roleList);

mock.onGet('/api/contactApp/contact/List').reply((config) => {
  const params = config.params;
  let folderContactList = [];
  if (params.type === 'folder') {
    if (params.name === 'starred') {
      folderContactList = contactList.filter((contact) => contact.accountStatus);
    } else if (params.name === 'frequent') {
      folderContactList = contactList.filter((contact) => contact.isFrequent);
    } else {
      folderContactList = contactList;
    }
  } else {
    const labelType = roleList.find((label) => label.alias === params.name).id;
    folderContactList = contactList.filter(
      (contact) => contact.label === labelType,
    );
  }
  const index = params.page * 15;
  const count = folderContactList.length;
  const data =
    folderContactList.length > 15
      ? folderContactList.slice(index, index + 15)
      : folderContactList;
  return [200, {data, count}];
});

mock.onPut('/api/contactApp/update/starred').reply((request) => {
  const {contactIds, status} = JSON.parse(request.data);
  contactList = contactList.map((contact) => {
    if (contactIds.includes(contact.id)) {
      contact.accountStatus = !!status;
      return contact;
    } else {
      return contact;
    }
  });
  const updatedList = contactList.filter((contact) =>
    contactIds.includes(contact.id),
  );
  return [200, updatedList];
});

mock.onPost('/api/contactApp/delete/contact').reply((request) => {
  const {contactIds, type, name, page} = JSON.parse(request.data);
  let folderContactList = [];
  if (type === 'folder') {
    if (name === 'starred') {
      contactList = contactList.filter(
        (contact) => !contactIds.includes(contact.id),
      );
      folderContactList = contactList.filter((contact) => contact.isStarred);
    } else if (name === 'frequent') {
      contactList = contactList.filter(
        (contact) => !contactIds.includes(contact.id),
      );
      folderContactList = contactList.filter((contact) => contact.isFrequent);
    } else {
      contactList = contactList.filter(
        (contact) => !contactIds.includes(contact.id),
      );
      folderContactList = contactList;
    }
  } else {
    const labelType = roleList.find((label) => label.alias === name).id;
    contactList = contactList.filter(
      (contact) => !contactIds.includes(contact.id),
    );
    folderContactList = contactList.filter(
      (contact) => contact.label === labelType,
    );
  }
  const index = page * 15;
  const count = folderContactList.length;
  const data =
    folderContactList.length > 15
      ? folderContactList.slice(index, index + 15)
      : folderContactList;
  return [200, {data, count}];
});

mock.onPut('/api/contactApp/update/label').reply((request) => {
  const {contactIds, type} = JSON.parse(request.data);
  contactList = contactList.map((contact) => {
    if (contactIds.includes(contact.id)) {
      contact.label = type;
      return contact;
    } else {
      return contact;
    }
  });
  const updatedContacts = contactList.filter((contact) =>
    contactIds.includes(contact.id),
  );
  return [200, updatedContacts];
});

mock.onPut('/api/contactApp/contact/').reply((request) => {
  const {contact} = JSON.parse(request.data);
  contactList = contactList.map((item) =>
    item.id === contact.id ? contact : item,
  );
  return [200, contact];
});

mock.onPost('/api/contactApp/compose').reply((request) => {
  const {contact} = JSON.parse(request.data);
  console.log("json",JSON.parse(request.data));
  contactList = [contact, ...contactList];
  return [200, contact];
});

mock.onGet('/api/contactApp/contact/').reply((config) => {
  const params = config.params;
  const response = contactList.find(
    (contact) => contact.id === parseInt(params.id),
  );
  return [200, response];
});
