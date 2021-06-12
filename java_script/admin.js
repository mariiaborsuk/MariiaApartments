window.onload=function(){
class Offer{
	address
	code
	city
	size
	rooms
	bedrooms
	type
	price
	deposit
	from
	created
	constructor(address,code, city, size, rooms, bedrooms, type, price, deposit, from, created){
	this.address=address;
	this.code=code;
	this.city=city;
	this.size=size;
	this.rooms=rooms;
	this.bedrooms=bedrooms;
	this.type=type;
	this.price=price;
	this.deposit=deposit;
	this.from=from;
	this.created=created;
	}
}
function addFlat(event){
	if(document.getElementById("address").value.trim()==""||document.getElementById("code").value.trim()==""||document.getElementById("city").value.trim()==""||document.getElementById("size").value.trim()==""||document.getElementById("rooms").value.trim()==""||document.getElementById("bedrooms").value.trim()==""||document.getElementById("type").value.trim()==""||document.getElementById("price").value.trim()==""||document.getElementById("deposit").value.trim()==""||document.getElementById('from').value.trim()==""||document.getElementById('created').value.trim()==""){
		return;
	}
	event.preventDefault();
	let offer=new Offer(
		document.getElementById("address").value,
		document.getElementById("code").value,
		document.getElementById("city").value,
		document.getElementById("size").value,
		document.getElementById("rooms").value,
		document.getElementById("bedrooms").value,
		document.getElementById("type").value,
		document.getElementById("price").value,
		document.getElementById("deposit").value,
		document.getElementById("from").value,
		document.getElementById("created").value

		);
	let offers=getItemsFromStorage();
	offers.push(offer);
	saveItemsToStorage(offers);
	renderApartmentsList(getItemsFromStorage());
	resetForm();
}
function renderApartmentsList(offers){
	document.getElementById("rent").innerHTML=`
	<thead>
	<tr>
					<th>Address</th>
					<th>Postal Code</th>
					<th>City</th>
					<th>Size</th>
					<th>Amount of rooms</th>
					<th>Amount of bedrooms</th>
					<th>type</th>
					<th>price</th>
					<th>Deposit</th>
					<th>Available from</th>
					<th>Created</th>
					<th colspan="2">Actions</th>
					</tr>
				</thead>`

				for(i=0; offers.length>i; i++){
					let tr=document.createElement("tr");
					let addressTd=document.createElement("td");
					addressTd.innerText=offers[i].address;
					tr.appendChild(addressTd);
					let codeTd=document.createElement("td");
					codeTd.innerText=offers[i].code;
					tr.appendChild(codeTd);
					let cityTd=document.createElement("td");
					cityTd.innerText=offers[i].city;
					tr.appendChild(cityTd);
					let sizeTd=document.createElement("td");
					sizeTd.innerText=offers[i].size;
					tr.appendChild(sizeTd);
					let roomsTd=document.createElement("td");
					roomsTd.innerText=offers[i].rooms;
					tr.appendChild(roomsTd);
					let bedroomsTd=document.createElement("td");
					bedroomsTd.innerText=offers[i].bedrooms;
					tr.appendChild(bedroomsTd);
					let typeTd=document.createElement("td");
					typeTd.innerText=offers[i].type;
					tr.appendChild(typeTd);
					let priceTd=document.createElement("td");
					priceTd.innerText=offers[i].price;
					tr.appendChild(priceTd);
					let depositTd=document.createElement("td");
					depositTd.innerText=offers[i].deposit;
					tr.appendChild(depositTd);
					let fromTd=document.createElement("td");
					fromTd.innerText=offers[i].from;
					tr.appendChild(fromTd);
					let createdTd=document.createElement("td");
					createdTd.innerText=offers[i].created;
					tr.appendChild(createdTd);
					let editButton=document.createElement("button");
					editButton.innerText="Edit";
					tr.appendChild(editButton);
					editButton.className="edit";
					editButton.dataset.editItemId=i;
					editButton.addEventListener("click", editItem);
					//<button data-edit-item-id="3">Edit</button>
					let deleteButton=document.createElement("button");
					deleteButton.innerText="Delete";
					deleteButton.className="delete";
					deleteButton.dataset.deleteItemId=i;
					tr.appendChild(deleteButton);
					deleteButton.addEventListener("click", deleteItem);
 					document.getElementById("rent").appendChild(tr);
				}

}
function deleteItem(event){
	event.preventDefault();
	let itemId=parseInt(event.target.dataset.deleteItemId);
	offers.splice(itemId,1);
	saveItemsToStorage(offers);
	renderApartmentsList(getItemsFromStorage());
}
function editItem(event){
	event.preventDefault();
	let offers=getItemsFromStorage();
	document.getElementById("button").remove();
	let saveBtn=document.createElement("button");
	saveBtn.id="save";
	saveBtn.innerText="Save"
	saveBtn.addEventListener("click", saveElement);
	document.getElementsByClassName("add")[0].appendChild(saveBtn);
	let cancelBtn=document.createElement("button");
	cancelBtn.id="cancel";
	cancelBtn.innerText="cancel"
	cancelBtn.addEventListener("click", cancel);
	let cancelDiv=document.createElement("div");
	cancelDiv.appendChild(cancelBtn);
	document.getElementById("add").appendChild(cancelDiv);
	let itemId=parseInt(event.target.dataset.editItemId);
	document.getElementById('address').value=offers[itemId].address;
	document.getElementById('code').value=offers[itemId].code;
	document.getElementById('city').value=offers[itemId].city;
	document.getElementById('size').value=offers[itemId].size;
	document.getElementById('rooms').value=offers[itemId].rooms;
	document.getElementById("bedrooms").value=offers[itemId].bedrooms;
	document.getElementById('type').value=offers[itemId].type;
	document.getElementById('price').value=offers[itemId].price;
	document.getElementById('deposit').value=offers[itemId].deposit;
	document.getElementById('from').value=offers[itemId].from;
	document.getElementById('created').value=offers[itemId].created;
	document.getElementById("add").dataset.saveItemId=itemId;

}
function saveElement(event){
	event.preventDefault();
	let itemId=parseInt(document.getElementById("add").dataset.saveItemId);
	let offers=getItemsFromStorage();
	offers[itemId].address=document.getElementById('address').value;
	offers[itemId].code=document.getElementById('code').value;
	offers[itemId].city=document.getElementById('city').value;
	offers[itemId].size=document.getElementById('size').value;
	offers[itemId].rooms=document.getElementById('rooms').value;
	offers[itemId].bedrooms=document.getElementById("bedrooms").value;
	offers[itemId].type=document.getElementById('type').value;
	offers[itemId].price=document.getElementById('price').value;
	offers[itemId].deposit=document.getElementById('deposit').value;
	offers[itemId].from=document.getElementById('from').value;
	offers[itemId].created=document.getElementById('created').value;
	resetForm();
	resetButtons();
	saveItemsToStorage(offers);
	renderApartmentsList(getItemsFromStorage());

}
function cancel(event){
	event.preventDefault();
	resetForm();
	resetButtons();
}
function resetButtons(){
	event.preventDefault();
	document.getElementById('cancel').remove();
	document.getElementById('save').remove();
	let btn=document.createElement('button');
	btn.id="button";
	btn.innerText="add";
	document.getElementsByClassName('add')[0].appendChild(btn);

}
function resetForm() {
	document.getElementById('address').value="";
	document.getElementById('code').value="";
	document.getElementById("city").value="";
	document.getElementById('size').value="";
	document.getElementById("rooms").value="";
	document.getElementById('bedrooms').value="";
	document.getElementById("type").value="";
	document.getElementById("price").value="";
	document.getElementById("deposit").value="";
	document.getElementById("from").value="";
	document.getElementById("created").value="";
	
}

function getItemsFromStorage(){
	let appartmentsList=localStorage.getItem("offers");
	if(appartmentsList==null){
		return [];
	}
	let offers=JSON.parse(appartmentsList);
	let result=[];
	for(i=0; offers.length>i; i++){
		let offer=new Offer(offers[i].address, offers[i].code, offers[i].city, offers[i].size, offers[i].rooms, offers[i].bedrooms, offers[i].type, offers[i].price, offers[i].deposit, offers[i].from, offers[i].created);
		result.push(offer);
	}
	return result;
}
function saveItemsToStorage(offers){
	localStorage.setItem('offers', JSON.stringify(offers));
}
let offers=getItemsFromStorage();
document.getElementById("button").addEventListener("click",addFlat)
renderApartmentsList(offers);
};