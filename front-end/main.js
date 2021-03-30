document.getElementById("item-estoque").click()

function abrirMenu(){
    document.getElementById("menu").style.width = "250px"
    document.getElementById("container").style.marginLeft = "250px"
    document.getElementById("btn-abrir").style.marginRight = "0px"
    document.getElementById("foot").style.marginLeft = "250px"
}

function fecharMenu(){
    document.getElementById("menu").style.width = "0px"
    document.getElementById("container").style.marginLeft = "0px"
    document.getElementById("btn-abrir").style.marginRight = "-250px"
    document.getElementById("foot").style.marginLeft = "0px"
}

function abrirConteudo(event, idItem){
    title = idItem.substring(0,1).toUpperCase().concat(idItem.substring(1))
    document.title ="SGE - " + title
    var conteudos = document.getElementsByClassName("conteudo")
    var itensMenu = document.getElementsByClassName("item-menu")

    for(var cont of conteudos){
        cont.style.display = "none"   
    }

    for(var item of itensMenu){
        item.classList.remove("ativo")   
    }

    document.getElementById(idItem).style.display = "flex"
    event.target.classList.add("ativo")
    
}


function adicionarEstoque(event){
    event.preventDefault()

    var produto = document.getElementById("produto").value

    if(produto == ""){
        alert("Preencha o campo produto!")
    } else{
        var URL = "http://localhost:3333/estoque/"

        var prod ={
            produto: produto
        }
    
        fetch(URL, {
            method: "POST",
            body: JSON.stringify(prod),
            headers: {"Content-Type": "application/json; charset=utf-8"}
          
          }).then((response) => response.json()).then((data) =>{
              alert("Produto salvo com sucesso! ID: " + data._id)
          }).catch((error) =>{
              console.log(error)
          })
    
          document.getElementById("produto").value = ""
    }

 
    
}


function addEntrada(event){

    event.preventDefault()

    var entradaProduto = document.getElementById("pesquisar-produto")
    var entradaQauntidade = document.getElementById("quantidade-entrada")

    if(entradaProduto.value == "" || entradaQauntidade.value == ""){
        alert("Preencha todos os campos!")
    } else{
        alert("ID: " + entradaProduto.value + "QTD: " + entradaQauntidade.value)
        entradaProduto.value = ""
        entradaQauntidade.value = ""
    } 
}

function carregarDataList(){
 
    var dataList = document.getElementById("produtos")
    dataList.innerHTML = ""

    fetch("http://localhost:3333/estoque/").then((response) => {
        return response.json()
    }).then((data) => {

        for(var prod of data){
            var opt = document.createElement("option")
            opt.value = prod._id
            opt.innerHTML = prod.produto.toUpperCase()
            dataList.appendChild(opt)
        }
    })
}

carregarDataList()