/**********************************************************************
 * Objetivo: criar uma API que possa filtrar e retornar dados para uma aplicação Front-End que ainda será desenvolvida na fase 2 desse projeto.
 * Autor: Gabriel Souza Costa
 * Data: 22/11/2024
 * Versão: 1.0
 **********************************************************************/

var alunos = require ('./alunos')
var retornoAluno = alunos.alunos
var cursos = require ('./cursos')
var retornoCurso = cursos.cursos

// Função que Recupera uma lista de todos os cursos oferecidos pela escola. 
const listaDeCursos = function() {
    let retornoDoObjeto = {'cursos': retornoCurso}

    return Array.isArray(retornoCurso)? retornoDoObjeto:false
}

// Função que Recupera uma lista de todos os alunos matriculados na escola.
const alunosMatriculados = function() {
    let retornoDoObjeto = {'alunos': retornoAluno}

    return retornoDoObjeto
}

// Função que Recupera informações de um aluno específico com base no número de matrícula
const alunoMatricula = function(matricula) {
    let numMatricula = matricula
    let retornoDoObjeto = false

    retornoAluno.forEach(function(aluno){
        if (aluno.matricula == numMatricula) {
            retornoDoObjeto = aluno
        }
    })
    return retornoDoObjeto
}

// Função que Recupera uma lista de todos os alunos matriculados no curso especificado. DS ou REDES 
const filtroCurso = function(nomeCurso) {
    let numCurso = nomeCurso
    let retornoDoObjeto = {curso : numCurso, alunos : []}

    retornoAluno.forEach(function(aluno){
        aluno.curso.forEach(function(cursoAluno){
            if (cursoAluno.sigla = numCurso) {
                retornoDoObjeto.alunos.push(aluno)
            }
        })
    })
    return retornoDoObjeto
}

//Função que Recupera uma lista de todos os alunos com o status especificado. Finalizado ou Cursando
const filtroStatus = function(status) {
    let numStatus = status
    let retornoDoObjeto = { status: numStatus, alunos: [] }

    retornoAluno.forEach(function(aluno) {
        if (aluno.status === numStatus) {
            retornoDoObjeto.alunos.push(aluno)
        }
    })

    return retornoDoObjeto
}

//Função que Recupera uma lista de alunos matriculados em um curso especificado e com base em um status da disciplina Aprovado, Reprovado ou EXAME
const statusAlunos = function(nomeCurso, statusDoAluno) {
    let numCurso = nomeCurso
    let numStatus = statusDoAluno
    let retornoDoObjeto = { curso: numCurso, status: numStatus, alunos: [] }

    retornoAluno.forEach(function(aluno) {

        aluno.curso.forEach(function(cursosDoAluno) {
            
            if (cursosDoAluno.sigla === numCurso) {
                let statusDisciplinas = []

                cursosDoAluno.disciplinas.forEach(function(cursoDisciplina) {
                    
                    if (cursoDisciplina.status === numStatus) {
                        statusDisciplinas.push(cursoDisciplina)
                    }
                })

                if (statusDisciplinas.length > 0) {
                    retornoDoObjeto.alunos.push(aluno)
                }
            }
        })
    })

    return retornoDoObjeto
}

// Função que Recupera uma lista de alunos matriculados em um curso especificado e com base no ano de conclusão 
const anoConclusao = function(nomeCurso, anoConclusao) {
    let numCurso = nomeCurso
    let ano = anoConclusao
    let retornoDoObjeto = { curso: numCurso, ano: ano, alunos: [] }

    if (retornoCurso.some(curso => curso.sigla === numCurso)) {
        retornoAluno.forEach(function(aluno) {
            aluno.curso.forEach(function(CursoAluno) {
                if (CursoAluno.sigla === numCurso && CursoAluno.conclusao == ano) {
                    retornoDoObjeto.alunos.push(aluno)
                }
            })
        })
    } else {
        retornoDoObjeto = false
    }
    return retornoDoObjeto
}
//console.log(listaDeCursos())
//console.log(alunosMatriculados())
//console.log(alunoMatricula('20151001001'))
//console.log(filtroCurso('RDS'))
//console.log(filtroStatus('Cursando'))
//console.log(statusAlunos('RDS', 'Aprovado'))
//console.log(anoConclusao('RDS', '2024'))
//console.log(anoConclusao('RDS','2022'))

module.exports = {
    listaDeCursos,
    alunosMatriculados,
    alunoMatricula,
    filtroCurso,
    filtroStatus,
    statusAlunos,
    anoConclusao
}