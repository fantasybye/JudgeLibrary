/* eslint-disable import/extensions, import/no-extraneous-dependencies, import/no-webpack-loader-syntax*/
import { Route, DefaultRoute } from 'react-router';
import React from 'react';
import Search from 'react-router?name=judge_search!./containers/Search';
import StarComment from 'react-router?name=judge_comment!./containers/StarComment';
import CaseDetail from 'react-router?name=case_detail!./containers/CaseDetail';
import CaseWeight from 'react-router?name=case_weight!./containers/CaseWeight';
import Compare from 'react-router?name=judge_compare!./containers/Compare';
import WeightEditor from 'react-router?name=config!./containers/WeightEditor';
import JudgeDetail from 'react-router?name=judge_detail!./containers/JudgeDetail';
import Home from 'react-router?name=home!./containers/Home';
import Login from './containers/Log';

const routes = (
  <Route>
    <Route name="/config" handler={WeightEditor} />
    <Route name="/case_detail" handler={CaseDetail} />
    <Route name="/case_weight" handler={CaseWeight} />
    <Route name="/judge_search" handler={Search} />
    <Route name="/judge_comment" handler={StarComment} />
    <Route name="/judge_compare" handler={Compare} />
    <Route name="/judge_detail" handler={JudgeDetail} />
    <Route name="/home" handler={Home} />
    <Route name="/login" handler={Login} />
    {/* <DefaultRoute handler={Home} />*/}
    <DefaultRoute handler={Login} />
  </Route>
);
export default routes;
