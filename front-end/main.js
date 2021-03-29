document.getElementById("item-estoque").click()

function abrirMenu(){
    document.getElementById("menu").style.width = "250px"
    document.getElementById("container").style.marginLeft = "250px"
}

function fecharMenu(){
    document.getElementById("menu").style.width = "0px"
    document.getElementById("container").style.marginLeft = "0px"
}

function abrirConteudo(event, idItem){
    var conteudos = document.getElementsByClassName("conteudo")
    var itensMenu = document.getElementsByClassName("item-menu")

    for(var cont of conteudos){
        cont.style.display = "none"   
    }

    for(var item of itensMenu){
        item.classList.remove("ativo")   
    }

    document.getElementById(idItem).style.display = "block"
    event.target.classList.add("ativo")
    
}