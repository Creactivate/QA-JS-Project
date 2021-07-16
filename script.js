console.log(qa);
console.log(window);

let dataArray = [
    {
        "ninumber": "PF547345X",
        "fullname": "Chris P Bacon",
        "phone": "07659-831024",
        "address":"123 Elliot Hill",
        "department": "IT"
    },
    {
        "ninumber": "XS130502B",
        "fullname": "Miles A Head",
        "phone": "07667-616680",
        "address":"321 Haha Road",
        "department": "Sales"
    },
    {
        "ninumber": "MY034526D",
        "fullname": "Rick O' Shea",
        "phone": "07440-003065",
        "address":"64 Zoo Lane",
        "department": "HR"
    },
    {
        "ninumber": "AK311470",
        "fullname": "Robyn Banks",
        "phone": "07822-821023",
        "address":"234 Julian Market",
        "department": "IT"
    },
    {
        "ninumber": "LY682275B",
        "fullname": "Lorne Mowers",
        "phone": "07659-831024",
        "address":"12 Springfield Grange",
        "department": "IT"
    },
    {
        "ninumber": "BK227215B",
        "fullname": "Frank N Stein",
        "phone": "07822-821023",
        "address":"324 Langton Ridgeway",
        "department": "Sales"
    },
    {
        "ninumber": "XB363374C",
        "fullname": "Hedda Hare",
        "phone": "07659-758264",
        "address":"54 Blackbird Crescent",
        "department": "IT"
    },
]

let editable = false;



let deleteRowHandler = (e) => {
    let confirmed = confirm("are you sure");
    if(confirmed){
        delete dataArray[e.target.dataset.number];
        e.target.parentElement.remove();
    }
    
}

let searchHandler = (el) => {
    console.log(el.value);
    let trs = document.querySelectorAll('.dataCreated');
    trs.forEach(item => {
        
            if (item.lastChild.previousSibling.innerHTML.indexOf(el.value) !== -1){
                item.style.display = "table-row"; 
            } else {
                item.style.display = "none"
            }
        
        
    })
}

let checkId = (id, lookingFor) => {
    if (id.indexOf(lookingFor) !== -1) {
        return true
    } else {
        return false
    }
}

let editHandler = (e) => {
    console.log(e.target.id)
    let idNo = e.target.id
    idNo = idNo.replace( /^\D+/g, '');

    if (checkId(e.target.id, 'ninumber')) {
        dataArray[idNo].ninumber = e.target.innerHTML;
        console.log(dataArray[idNo].ninumber)
        console.log(e.target.innerHTML);
    }

    if (checkId(e.target.id, 'fullname')) {
        dataArray[idNo].fullname = e.target.innerHTML;
        console.log(dataArray[idNo].fullname)
        console.log(e.target.innerHTML);
    }

    if (checkId(e.target.id, 'phonenumber')) {
        dataArray[idNo].phone = e.target.innerHTML;
        console.log(dataArray[idNo].phone)
        console.log(e.target.innerHTML);
    }

    if (checkId(e.target.id, 'address')) {
        dataArray[idNo].address = e.target.innerHTML;
        console.log(dataArray[idNo].address)
        console.log(e.target.innerHTML);
    }

    if (checkId(e.target.id, 'department')) {
        dataArray[idNo].department = e.target.innerHTML;
        console.log(dataArray[idNo].department)
        console.log(e.target.innerHTML);
    }

    console.log(dataArray);
}

let showDelete = (event) => {
    let delBtn = document.querySelector(`.deleteRow[data-number="${event.target.dataset.number}"]`);
    delBtn.style.visibility = "visible";
}

let hideDelete = (event) => {
    let delBtn = document.querySelector(`.deleteRow[data-number="${event.target.dataset.number}"]`);
    delBtn.style.visibility = "hidden";
}

let renderTable = () => {
    if (document.getElementById('renderedTable')) {
        document.getElementById('renderedTable').remove();
    }

    let tableBody = document.createElement('tbody');

    dataArray.forEach((item, i)=>{
        let tableRow = document.createElement('tr');
        tableRow.className = "dataCreated";
        let deleteRow = document.createElement('input');
        deleteRow.type = 'button';
        deleteRow.className = "deleteRow";
        deleteRow.dataset.number = i;
        deleteRow.onclick = deleteRowHandler;
        deleteRow.value = "Delete Entry"
        deleteRow.style.visibility = "hidden";
        let niNumber = document.createElement('td');
        let fullName = document.createElement('td');
        let phoneNumber = document.createElement('td');
        let address = document.createElement('td');
        let department = document.createElement('td');
    
        niNumber.innerHTML = item.ninumber;
        fullName.innerHTML = item.fullname;
        phoneNumber.innerHTML = item.phone;
        address.innerHTML = item.address;
        department.innerHTML = item.department;

        // niNumber.contentEditable = "true";
        // fullName.contentEditable = "true";
        // phoneNumber.contentEditable = "true";
        // address.contentEditable = "true";
        // department.contentEditable = "true";

        niNumber.addEventListener('input',editHandler);
        fullName.addEventListener('input',editHandler);
        phoneNumber.addEventListener('input',editHandler);
        address.addEventListener('input',editHandler);
        department.addEventListener('input',editHandler);

        niNumber.id = "ninumber" + i;
        fullName.id = "fullname" + i;
        phoneNumber.id = "phonenumber" + i;
        address.id = "address" + i;
        department.id = "department" + i;
    
        tableRow.appendChild(niNumber);
        tableRow.appendChild(fullName);
        tableRow.appendChild(phoneNumber);
        tableRow.appendChild(address);
        tableRow.appendChild(department);
        tableRow.appendChild(deleteRow);
        tableRow.dataset.number = i;
        tableRow.addEventListener('mouseenter', showDelete);
        tableRow.addEventListener('mouseleave', hideDelete);

        tableBody.appendChild(tableRow);
        tableBody.id = "renderedTable";
    
        document.getElementById('dataTableDisplay').appendChild(tableBody);
    });
}

renderTable();



let submitAdd = () => {
    let ninumber = document.getElementById('NINumber').value;
    let fullname = document.getElementById('fullName').value;
    let phone = document.getElementById('phoneNumber').value;
    let address = document.getElementById('Address').value;
    let department = document.getElementById('department').value;

    dataArray.push({
        ninumber,
        fullname,
        phone,
        address,
        department
    });

    renderTable();
    showAddEntry();

    return false
}

let showAddEntry = (e) => {
    if (document.getElementById('addForm').style.display == "none") {
        document.getElementById('addForm').style.display = "grid";
        
    } else {
        document.getElementById('addForm').style.display = "none";
        
    }
}

let enableEditing = (el) => {
    let allData = document.querySelectorAll('.dataCreated>td');
    if (!editable) {
        allData.forEach(item => {
            item.contentEditable = 'true';
            editable = true;
            el.value = "Disable Editing";
            allData[0].focus();
        });
    } else {
        allData.forEach(item => {
            item.contentEditable = 'false';
            editable = false;
            el.value = "Enable Editing";
        });
    }

}



