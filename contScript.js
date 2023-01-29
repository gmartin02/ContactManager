function addContact()
{ 
    /*var rollno=document.sample.rollno.value;*/ 
    var fName=document.sample.fName.value;
    var lName=document.sample.lName.value;
    var phNumber=document.sample.phNumber.value;
    var email=document.sample.email.value;
    var address=document.sample.address.value;

    var tr = document.createElement('tr');

    var td1 = tr.appendChild(document.createElement('td'));
    var td2 = tr.appendChild(document.createElement('td'));
    var td3 = tr.appendChild(document.createElement('td'));
    var td4 = tr.appendChild(document.createElement('td'));
    var td5 = tr.appendChild(document.createElement('td'));
    var td6 = tr.appendChild(document.createElement('td'));
    var td7 = tr.appendChild(document.createElement('td'));


    td1.innerHTML=fName;
    td2.innerHTML=lName;
    td3.innerHTML=phNumber;
    td4.innerHTML=email;
    td5.innerHTML=address;

    td6.innerHTML='<input type="button" name="del" value="Delete" onclick="delCon(this);" class="btn btn-danger">'
    td7.innerHTML='<input type="button" name="up" value="Update" onclick="UpCon(this);" class="btn btn-primary">'

    document.getElementById("tbl").appendChild(tr);
}

function UpCon(con){
    var fName=document.sample.fName.value;
    var lName=document.sample.lName.value;
    var phNumber=document.sample.phNumber.value;
    var email=document.sample.email.value;
    var address=document.sample.address.value;

    var s = con.parentNode.parentNode;
    var tr = document.createElement('tr');

    var td1 = tr.appendChild(document.createElement('td'));
    var td2 = tr.appendChild(document.createElement('td'));
    var td3 = tr.appendChild(document.createElement('td'));
    var td4 = tr.appendChild(document.createElement('td'));
    var td5 = tr.appendChild(document.createElement('td'));
    var td6 = tr.appendChild(document.createElement('td'));
    var td7 = tr.appendChild(document.createElement('td'));


    td1.innerHTML='<input type="text" name="fName1">';
    td2.innerHTML='<input type="text" name="lame1">';
    td3.innerHTML='<input type="text" name="phNumber1">';
    td4.innerHTML='<input type="text" name="email1">';
    td5.innerHTML='<input type="text" name="address1">';


    td6.innerHTML='<input type="button" name="del" value="Delete" onclick="delCon(this);" class="btn btn-danger">'
    td7.innerHTML='<input type="button" name="up" value="Update" onclick="changeCon(this);" class="btn btn-primary">'

    document.getElementById("tbl").replaceChild(tr, s);
}

function changeCon(con){
    
    var fName=document.sample.fName1.value;
    var lName=document.sample.lName1.value;
    var phNumber=document.sample.phNumber1.value;
    var email=document.sample.email1.value;
    var address=document.sample.address1.value;


    var s = con.parentNode.parentNode;
    var tr = document.createElement('tr');

    var td1 = tr.appendChild(document.createElement('td'));
    var td2 = tr.appendChild(document.createElement('td'));
    var td3 = tr.appendChild(document.createElement('td'));
    var td4 = tr.appendChild(document.createElement('td'));
    var td5 = tr.appendChild(document.createElement('td'));
    var td6 = tr.appendChild(document.createElement('td'));
    var td7 = tr.appendChild(document.createElement('td'));



    td1.innerHTML=fName;
    td2.innerHTML=lName;
    td3.innerHTML=phNumber;
    td4.innerHTML=email;
    td5.innerHTML=address;


    td6.innerHTML='<input type="button" name="del" value="Delete" onclick="delCon(this);" class="btn btn-danger">'
    td7.innerHTML='<input type="button" name="up" value="Update" onclick="UpCon(this);" class="btn btn-primary">'

    document.getElementById("tbl").replaceChild(tr, s);
}


function delCon(Con){
    var s=Con.parentNode.parentNode;
    s.parentNode.removeChild(s);
}