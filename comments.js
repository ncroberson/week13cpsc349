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
          if (!comments) {
            let error = document.createElement('P');
            error.innerText = 'Error loading comments';
            commentSection.appendChild(error);
          }
        }
      } else {
        commentSection.hidden = true;
        button.textContent = 'Show comments';
      }

      event.preventDefault();
    });
  });

  function loadComments (postID, commSection) {
    let baseurl = 'https//jsonplaceholder.typecode.com/comments';
    const $ = window.$;
    $.ajax({
      type: 'GET',
      url: baseurl,
      data: { postId: postID },
      dataType: 'json',
      success: function (resp) {
        for (let item in resp.data) {
          generateComment(item, commSection);
        }
        return true;
      },
      error: function (req) {
        return false;
      }
    });
  }
  function generateComment (commData, commSection) {
    let commBody = document.createElement('P');
    let addr = document.createElement('address');
    commBody.innerText = commData.body.replace(/\n/g, '<br />');
    let link = document.createElement('a');
    link.href = 'mailto:' + commData.email;
    link.innerText = commData.name;
    addr.appendChild(link);
    commSection.appendChild(commBody);
    commSection.appendChild(addr);
  }
})(window);
