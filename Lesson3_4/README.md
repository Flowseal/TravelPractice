# Delivery Database

## Доменная зона
База состоит из 3 таблиц: курьер (Courier), клиент (Client), доставка (Delivery). Таблицы связаны с помощью Id клиента и курьера, которые являются внешними ключами (FK) в таблице Delivery. Как и одному курьеру, так и одному клиенту может соответствовать множество доставок.

## ER диаграмма
![ER-Diagram](https://github.com/Flowseal/TravelPractice/blob/hometasks/Lesson3_4/ReadmeImages/bd.png?raw=true)

## Queries
### Create

```sql
create table Courier (
	CourierId int identity(1, 1) not null constraint PK_Courier primary key,
	Name nvarchar(50) not null,
	Phone nvarchar(50) not null
)

create table Client (
	ClientId int identity(1, 1) not null constraint PK_Client primary key,
	Name nvarchar(50) not null,
	Address nvarchar(50) not null,
	Phone nvarchar(50) not null
)

create table Delivery (
	DeliveryId int identity(1, 1) not null constraint PK_Delivery primary key,
	Composition nvarchar(50) not null,
	ClientId int not null constraint FK_Delivery_Client references Client(ClientId)
		on delete cascade 
		on update cascade,
	CourierId int not null constraint FK_Delivery_Courier references Courier(CourierId)
		on delete cascade
		on update cascade
)
```

### Insert

```sql
insert into Client (Name, Address, Phone) values 
	(N'Иван Петров', N'Бульвар Грекова', N'Моб. 79289924956'),
	(N'Александр', N'Ул. Шубина 12', N'455123'),
	(N'Иван Иванов', N'Ул. Рябина 4', N'634123'),
	(N'Григорий Филов', N'Ул. Крекерова 22', N'645555'),
	(N'Иоан Васильев', N'Ул. Слойная 7', N'79048869876')
```

```sql
insert into Courier (Name, Phone) values 
	(N'Андрей Григорьев', N'79270976891'),
	(N'Екатерина Шубина', N'79029877901'),
	(N'Василий Жуков', N'89058879243')
```

```sql
insert into Delivery (Composition, ClientId, CourierId) values 
	(N'Игровая Мышь', 1, 1),
	(N'Игровое Кресло', 1, 2),
	(N'Шкаф', 2, 1),
	(N'Тумбочка', 4, 2)
```

### Select
```sql
select Name from Client
```
```sql
select Address from Client where Name = N'Иван Иванов'
```
```sql
select * from Delivery where ClientId < 4
```
```sql
select
	CourierId,
	count(ClientId) as Clients
from Delivery
group by CourierId
```
```sql
select top 3 * from Client order by Name
```
```sql
select * from Client where
	ClientId between 1 and 2 or
	Name like N'Иван%'
```
```sql
select * from Client where ClientId in (1, 3, 4)
```
```sql
select
	Courier.Name as CourierName,
	count(Delivery.ClientId) as ClientsCount
from Courier
left join Delivery on Delivery.CourierId = Courier.CourierId
group by Courier.Name
having count(Delivery.ClientId) > 0
```

### Update
```sql
update Client set Phone = '123456' where Phone like N'Моб.%'
```
```sql
update Courier set Name = N'Андрей Иванов' where CourierId = 1
```
```sql
update Delivery set CourierId = 1 where DeliveryId in (2, 3) and CourierId = 2
```

### Delete
```sql
delete from Client where ClientId = 5
```

### Select with join

#### Inner join
```sql
select
	Client.Name as ClientName,
	Courier.Name as CourierName,
	Delivery.Composition
from Delivery
inner join Client on Client.ClientId = Delivery.ClientId
inner join Courier on Courier.CourierId = Delivery.CourierId
```
Объединяет все 3 таблицы, выводит имя клиента, имя курьера и состав доставки.
```
ClientName        CourierName       Composition
-------------------------------------------------
Иван Петров	      Андрей Иванов	    Игровая Мышь
Иван Петров	      Андрей Иванов	    Игровое Кресло
Александр	      Андрей Иванов	    Шкаф
Григорий Филов	  Екатерина Шубина	Тумбочка
```

#### Left join
```sql
select
	Courier.Name as CourierName,
	count(Delivery.ClientId) as DeliveriesCount
from Courier
left join Delivery on Delivery.CourierId = Courier.CourierId
group by Courier.Name
```
Выводит имя курьера и количество доставок, которое ему надо сделать. Количество доставок может быть в данном случае равно нулю.
```
Name                DeliveriesCount
-----------------------------------
Андрей Иванов	    3
Василий Жуков	    0
Екатерина Шубина	1
```

#### Right join
```sql
select
	Courier.Name as CourierName,
	count(Delivery.ClientId) as DeliveriesCount
from Courier
right join Delivery on Delivery.CourierId = Courier.CourierId
group by Courier.Name
```
Выводит имя курьера и количество его доставок. В отличии от left join, в данном случае количество доставок не может быть равно нулю (т.е. в записях доставок должен присутствовать id курьера)
```
Name                DeliveriesCount
-----------------------------------
Андрей Иванов	    3
Екатерина Шубина	1
```
