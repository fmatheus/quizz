/*
 * Copyright 2013 Fabrício Matheus Gonçalvez <fmatheus@gmail.com>
 * Copyright 2013 Ian Liu Rodrigues <ian.liu88@gmail.com>
 *
 * This file is part of Quizz.
 *
 * Quizz is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Quizz is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Foobar.  If not, see <http://www.gnu.org/licenses/>.
 */

angular.module('quizz', []).config(function ($routeProvider) {
  $routeProvider.
  when('/', {controller: ListCtrl, templateUrl:'list.html'}).
  when('/view/:questionId', {controller: ViewCtrl, templateUrl:'view.html'}).
  when('/edit/:questionId', {controller:EditCtrl, templateUrl:'edit.html'}).
  when('/new', {controller:CreateCtrl, templateUrl:'edit.html'}).
  otherwise({redirectTo:'/'});
});

questions = [];

function newQuestion(_title, _desc, _anstext) {
  var q = {
    id:questions.length,
    title: _title,
    description: _desc,
    answers: [
      {id: "a", text: "", count: 0},
      {id: "b", text: "", count: 0},
      {id: "c", text: "", count: 0},
      {id: "d", text: "", count: 0},
      {id: "e", text: "", count: 0},
    ],
  };
  for (var x in _anstext)
    q.answers[x].text = _anstext[x];
  return q;
}

questions.push(newQuestion(
  "Qual a raiz quadrada de 4?",
  "Selecione a opção que representa a resposta correta.",
  ["1", "2", "3", "4", "5"]
));

function ListCtrl($scope, $location) {
  $scope.questions = questions;

  $scope.newQuestion = function() {
    $location.path('/new');
  }
}

function EditCtrl($scope, $location, $routeParams) {
  $scope.question = questions[$routeParams.questionId];
  $scope.old_question = angular.copy($scope.question);

  $scope.save = function() {
    $location.path('/view/' + $scope.question.id);
  };

  $scope.cancel = function() {
    questions[$routeParams.questionId] = $scope.old_question;
    history.back();
  };
}

function CreateCtrl($scope, $location, $routeParams) {
  $scope.question = newQuestion("", "", ["", "", "", "", ""]);

  $scope.save = function() {
    questions.push($scope.question);
    $location.path('/view/' + $scope.question.id);
  }
}

function ViewCtrl($scope, $location, $routeParams) {
  $scope.question = questions[$routeParams.questionId];
  $scope.chosenAnswer = -1;

  $scope.choice = function(answer) {
    
  }
}
