import ReactStore from './reactStore';
import searchForm from '../form/searchForm';
import compareForm from '../form/compareForm';
import commentForm from '../form/judgeCommentForm';
import judgeForm from '../form/judgeDetailForm';

const user1 = localStorage.getItem('user');
let user = { username: 'szhqq', eventsId: 1547 };
if (user1 !== 'undefined' && user1 !== '' && user1) {
  const juser = JSON.parse(user1);
  user = {
    username: juser.username, eventsId: juser.events_id
  };
}
const initState = {
  homeDisplay: false,
  searchDisplay: false,
  user,
  searchForm: Object.assign(searchForm, { eventsId: user.eventsId }),
  compareForm: Object.assign(compareForm, { eventsId: user.eventsId }),
  commentForm: Object.assign(commentForm, { eventsId: user.eventsId }),
  detailDateShow: false,
  displayTime: '不限时间',
  judgeForm: Object.assign(judgeForm, { eventsId: user.eventsId })
};
const actions = {
  changeName(name, state = initState) {
    state.name = name;
  }
};
const store = new ReactStore(initState, actions);
export default store;
