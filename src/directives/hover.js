import $ from 'jquery';

export default {
  inserted(el, binding) {
    $(el).hover(() => {
      const el2 = $(`${binding.value.name}`).eq(binding.value.index);
      if (el2.css('display') === 'none') {
        el2.css('display', 'block');
      } else {
        el2.css('display', 'none');
      }
    });
  }
};
