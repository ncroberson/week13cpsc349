(function (window) {
  'use strict';

  const BUTTON_SELECTOR = '[data-posts="id"]';

  let buttons = document.querySelectorAll(BUTTON_SELECTOR);

  buttons.forEach(function (button) {
    'use strict';

    let sectionSelector = `#comments-${button.value}`;
    let commentSection = document.querySelector(sectionSelector);
    let comments = false;
    button.addEventListener('click', function (event) {
      if (commentSection.hidden) {
        if (comments) {
          commentSection.hidden = false;
          button.textContent = 'Hide comments';
        } else {
          comments = loadComments(button.value, commentSection);
          comments = true;
          commentSection.hidden = false;
          button.textContent = 'Hide comments';
        }
      } else {
        commentSection.hidden = true;
        button.textContent = 'Show comments';
      }

      event.preventDefault();
    });
  });

  function loadComments (postID, commSection) {
    let baseurl = 'https://jsonplaceholder.typicode.com/comments';
    const $ = window.$;
    let data;
    $.ajax({
      type: 'GET',
      url: baseurl + '?postId=' + postID,
      dataType: 'json',
      data: data,
      cache: false,
      success: function (data) {
        for (let i = 0; i < data.length; i++) {
          generateComment(data[i], commSection);
          console.log('generated comment success');
        }
      }
    });
  }
  function generateComment (commData, commSection) {
    let commBody = document.createElement('P');
    let addr = document.createElement('address');
    commBody.innerHTML = commData.body.replace(/\n/g, '<br />');
    let link = document.createElement('a');
    link.href = 'mailto:' + commData.email;
    link.innerText = commData.name;
    addr.appendChild(link);
    commSection.appendChild(commBody);
    commSection.appendChild(addr);
  }
})(window);
