/**********************************************************************
 * Objetivo: API para manipulular dados de uma escola (Cursos e Alunos)
 * Autor: Gabriel Souza Costa
 * Data: 29/11/2024
 * Versão: 1.0
 **********************************************************************/

const express       = require('express')
const cors          = require('cors')
const bodyParser    = require('body-parser')

const app = express()

app.use((request, response, next)=>{
    response.header('Access-Control-Allow-Origin', '*')

    response.header('Access-Control-Allow-Methods', 'GET')
    
    app.use(cors())
    next()
})

const escola = require('./MÓDULO/funcoes.js')

// EndPoint que retorna uma função que Recupera uma lista de todos os cursos oferecidos pela escola.
app.get('/v1/lion-school/cursos', cors(), async function (request, response){
    let dadoCursos = escola.listaDeCursos()

    if(dadoCursos){
        response.status(200)
        response.json(dadoCursos)
        }else{
            response.status(404)
            response.json({'status': 404, 'message': 'Não foi possível encontrar nenhum item de retorno'})
        }
})

// EndPoint que retorna uma função que recupera uma lista de todos os alunos matriculados na escola.
app.get('/v1/lion-school/alunos', cors(), async function (request, response){
    let dadoCursos = escola.alunosMatriculados()

    if(dadoCursos){
        response.status(200)
        response.json(dadoCursos)
        }else{
            response.status(404)
            response.json({'status': 404, 'message': 'Não foi possível encontrar nenhum item de retorno'})
        }
})

// EndPoint que retorna uma função que recupera informações de um aluno específico com base no número de matrícula
app.get('/v1/lion-school/alunos/:matricula', cors (), async function(request, response){

    let Dados = request.query.matricula

    let dados = escola.alunoMatricula(Dados)

    if(dados){
        response.status(200)
        response.json(dados)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'A matrícula do aluno não foi encontrada'})
    }
})

// Função que Recupera uma lista de todos os alunos matriculados no curso especificado. DS ou REDES
app.get('/v1/lion-school/alunos-matriculados/:curso', cors (), async function(request, response){

    let Dados = request.params.curso

    let dados = escola.filtroCurso(Dados)

    if(dados){
        response.status(200)
        response.json(dados)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'A matrícula do aluno não foi encontrada'})
    }
})

//Função que Recupera uma lista de todos os alunos com o status especificado. Finalizado ou Cursando
app.get('/v1/lion-school/alunos/filtro', cors (), async function(request, response){

    let Dados = request.query.status

    let dados = escola.filtroStatus(Dados)

    if(dados){
        response.status(200)
        response.json(dados)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'A matrícula do aluno não foi encontrada'})
    }
})

//Função que Recupera uma lista de alunos matriculados em um curso especificado e com base em um status da disciplina Aprovado, Reprovado ou EXAME
app.get('/v1/alunos-cursos/curso-status/:curso', cors (), async function(request, response){

    let Dados = request.params.curso

    let dados = escola.statusAlunos(Dados)

    if(dados){
        response.status(200)
        response.json(dados)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'A matrícula do aluno não foi encontrada'})
    }
})


app.listen('8080', function (){
    console.log('API aguardando requisições ...')
})