let produtos = [
{modelo:"Cross Over", preco:18000, img:"cross-over.jpg"},
{modelo:"Cadeira Extensora", preco:8500, img:"cadeira-extensora.jpg"},
{modelo:"Cadeira Adutora", preco:8200, img:"cadeira-adutora.jpg"},
{modelo:"Leg Press", preco:22000, img:"leg-press.jpg"},
{modelo:"Peck Deck", preco:15000, img:"peck-deck.jpg"},
{modelo:"Puxada Alta", preco:9200, img:"puxada-alta.jpg"}
];

let orcamento=[];

function formatarReal(valor){
return valor.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
}

function atualizarSelect(){
let select=document.getElementById("selectProduto");
select.innerHTML="";
produtos.forEach((p,index)=>{
select.innerHTML+=`<option value="${index}">${p.modelo} (${formatarReal(p.preco)})</option>`;
});
}
atualizarSelect();

function adicionarAoOrcamento(){
let index=document.getElementById("selectProduto").value;
let qtd=parseInt(document.getElementById("qtdProduto").value);
let produto=produtos[index];
orcamento.push({...produto,qtd});
atualizarTabela();
}

function atualizarTabela(){
let lista=document.getElementById("listaOrcamento");
lista.innerHTML="";
let total=0;

orcamento.forEach((item,index)=>{
let subtotal=item.preco*item.qtd;
total+=subtotal;

lista.innerHTML+=`
<tr>
<td><img src="img/${item.img}" width="70"></td>
<td>${item.modelo}</td>
<td>${item.qtd}</td>
<td>${formatarReal(item.preco)}</td>
<td>${formatarReal(subtotal)}</td>
<td><button class="btn btn-sm btn-danger" onclick="removerItem(${index})">X</button></td>
</tr>`;
});

let desconto=parseFloat(document.getElementById("desconto").value)||0;
let totalFinal= total - (total*(desconto/100));
document.getElementById("totalFinal").innerText=formatarReal(totalFinal);
}

function removerItem(index){
orcamento.splice(index,1);
atualizarTabela();
}

function gerarPDF(){

if(orcamento.length===0){
alert("Adicione pelo menos um item.");
return;
}

let agora=new Date();
let numero=Math.floor(Math.random()*100000);

document.getElementById("pdfNumero").innerText=numero;
document.getElementById("pdfData").innerText=agora.toLocaleDateString("pt-BR");

document.getElementById("pdfNome").innerText=document.getElementById("clienteNome").value||"-";
document.getElementById("pdfTelefone").innerText=document.getElementById("clienteTelefone").value||"-";
document.getElementById("pdfEmail").innerText=document.getElementById("clienteEmail").value||"-";

let tabela=document.getElementById("pdfTabela");
tabela.innerHTML="";

let total=0;

orcamento.forEach(item=>{
let subtotal=item.preco*item.qtd;
total+=subtotal;

tabela.innerHTML+=`
<tr>
<td>${item.modelo}</td>
<td>${item.qtd}</td>
<td>${formatarReal(item.preco)}</td>
<td>${formatarReal(subtotal)}</td>
</tr>`;
});

let desconto=parseFloat(document.getElementById("desconto").value)||0;
let totalFinal= total - (total*(desconto/100));

document.getElementById("pdfDesconto").innerText=desconto+"%";
document.getElementById("pdfTotal").innerText=formatarReal(totalFinal);

setTimeout(()=>{ window.print(); },300);
}

function enviarWhatsApp(){
let nome=document.getElementById("clienteNome").value;
let totalTexto=document.getElementById("totalFinal").innerText;
window.open("https://wa.me/?text="+encodeURIComponent(`Olá ${nome}, segue orçamento no valor de ${totalTexto}.`));
}

function enviarEmail(){
let email=document.getElementById("clienteEmail").value;
let totalTexto=document.getElementById("totalFinal").innerText;
window.location.href=`mailto:${email}?subject=Orçamento BRAWE&body=Valor total: ${totalTexto}`;
}

function novaVenda(){
orcamento=[];
atualizarTabela();
document.getElementById("clienteNome").value="";
document.getElementById("clienteTelefone").value="";
document.getElementById("clienteEmail").value="";
document.getElementById("desconto").value=0;
}
