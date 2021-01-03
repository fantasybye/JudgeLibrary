import { Component } from 'react';
import api from '../constants/api';
import store from '../store/store';

class ReactComponent extends Component {
  constructor(props, context) {
    super(props, context);
    this.$api = api;
    this.$store = store;
    this.$store.components.push(this);
  }
}
export default ReactComponent;
