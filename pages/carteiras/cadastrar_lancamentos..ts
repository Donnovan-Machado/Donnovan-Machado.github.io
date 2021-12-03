import { Lancamento } from "../../classes/lancamento.js";
import { Usuario } from "../../classes/usuario.js";

let usuarioLogado:Usuario = new Usuario("","","")

usuarioLogado.setDados(JSON.parse(localStorage.getItem("usuario_logado")))

let lancamentos:Array<Lancamento> = new Array<Lancamento>()
let chaveLocalStorage = `${usuarioLogado.getEmail()}_lancamentos`
console.log('chaveLocalStorage', chaveLocalStorage);

// localStorage.removeItem(chaveLocalStorage)
let itemCorrente:Lancamento

carregarDados()

function carregarDados() {
    $("input").val("")
    $("textarea").val("")
    $("#editar").hide()
    $("#enviar").show()

    itemCorrente=undefined

    let informacao=localStorage.getItem(chaveLocalStorage)

    if(informacao == undefined){
        salvar()
        carregarDados()

    }else{
        let listaTemporaria = JSON.parse(informacao)

        lancamentos=new Array<Lancamento>()

        listaTemporaria.forEach(temporario => {
            let lancamento= new Lancamento(
                temporario.titulo,
                temporario.debito,
                temporario.valor,
                temporario.data,
                temporario.observacao
            )
                lancamentos.push(lancamento)
                escreveLinha(lancamento)
        });
    }
}
function salvar() {
    localStorage.setItem(chaveLocalStorage, JSON.stringify(lancamentos))
}

function escreveLinha(lancamento: Lancamento) {
    $("tbody").append(
        $("<tr>").append(
            $("<td>", {text: converterData(lancamento.data)}),
            $("<td>", {text:lancamento.debito?"Debito":"Credito"}),
            $("<td>", {text:lancamento.titulo}),
            $("<td>", {text:lancamento.valor}),
        )
    )
}

$('form').on("submit",
    (event)=>{
        event.preventDefault()

        let formulario:Lancamento= new Lancamento(
            String($("#titulo_form").val()),
            $("#debito").is(":checked"),
            Number($("#valor_form").val()),
            new Date
                (String($("#data_form").val())),
            String($("#observacao").val()),
        )

            if (itemCorrente==undefined){
                adicionar(formulario)
            }else{
                atualizar(formulario)
            }
        
    }
)
function adicionar(lancamento: Lancamento) {
    lancamentos.push(lancamento)
    salvar()
    escreveLinha(lancamento)
}

function atualizar(formulario: Lancamento) {
    
}

function converterData(data: Date): string {
    return `${m10(data.getDate())}/${m10(data.getMonth()+1)}/${m10(data.getFullYear())}`
}

function m10(numero:number):string{
    return numero<10? ("0"+numero):(String(numero))
}
