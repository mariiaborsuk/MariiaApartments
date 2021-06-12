window.onload=function(){
	function displayApartments(offers){
		let main=document.getElementsByClassName("main")[0];
		main.innerHTML="";
		for(i=0; offers.length>i; i++ ){
			let forRent=document.createElement("div");
			forRent.className='forRent';
			forRent.innerHTML=`
			<div class="address" id="address"> Address: ${offers[i].address}</div>
			<div class="code" id="code">Code: ${offers[i].code}</div>
			<div class="city" id="city">City: ${offers[i].city}</div>
			<div class="size" id ="size">Size: ${offers[i].size} m2</div>
			<div class="rooms" id ="rooms">Rooms: ${offers[i].rooms}</div>
			<div class="bedrooms" id ="bedrooms">Bedrooms: ${offers[i].bedrooms}</div>
			<div class="type" id ="type">Type: ${offers[i].type}</div>
			<div class="price" id ="price">Price: ${offers[i].price} Euro</div>
			<div class="deposit" id ="deposit">Deposit: ${offers[i].deposit} Euro</div>
			<div class="from" id ="from">Available from: ${offers[i].from}</div>
			<div class="created" id ="created">Created: ${offers[i].created}</div>
			<div class="row" id="row">
			<button data-item-id="${i}">Add to wish list</button>
			</div>
			 `;
			 main.appendChild(forRent);
			
		}
	}
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
displayApartments(getItemsFromStorage());
}