$(() => {
  $(".results-slide-row").each((index, switcher) => {
    const $switcher = $(switcher);

    // ✅ Store and remove original placeholder <div>s
    const children = $switcher.children().toArray();
    $switcher.empty();

    // ✅ Create buttons dynamically from placeholder data
    children.forEach((child) => {
      const $child = $(child);
      const type = $child.data("type"); // 'iframe' or 'video'
      const id = $child.data("id");

      const $input = $("<button>", {
        class: `thumbnail-btn ${type}-thumb`,
        id: id,
        "data-type": type,
      });

      const $img = $("<img>", {
        class: "thumbnails",
        alt: "paper",
        src: $child.data("img-src"),
        style: {
          maxWidth: "100%",
          height: "auto",
          objectFit: "contain",
        },
      });

      const $label = $("<label>", {
        text: $child.data("label"),
        class: "thumbnail_label",
      });

      $input.append($img).append($label);
      $switcher.append($input);
    });
  });

  // ✅ Call only once outside the loop
  initializeIframeFlow();
  initializeVideoFlow();
});

// ----------------------------- IFRAME LOGIC -----------------------------
const iframeIds = ['spot', 'jumping_lamp', 'wood_puppet', 'turtle', 'motor'];
let iframeThumbnailIndex = 0;
let iframeThumbs = [];

function showIframe(idToShow) {
  iframeIds.forEach(id => {
    const iframe = document.getElementById(id);
    if (iframe) {
      if (id === idToShow) {
        iframe.classList.add('show');
        iframe.src = $(iframe).data('src');
      } else {
        iframe.classList.remove('show');
        iframe.src = "";
      }
    }
  });
}

function initializeIframeFlow() {
  iframeThumbs = $(".thumbnail-btn.iframe-thumb").toArray();

  iframeThumbs.forEach((btn, index) => {
    $(btn).on("click", function () {
      iframeThumbnailIndex = index;
      $(".thumbnail-btn.iframe-thumb").css('opacity', '');
      $(btn).css('opacity', '1.0');

      const iframeId = $(btn).attr('id').replace('-thumb', '');
      showIframe(iframeId);

      const slider = document.getElementById('results-objs-scroll');
      if (slider) {
        slider.scrollLeft = btn.offsetLeft - slider.offsetWidth / 2;
      }
    });
  });

  if (iframeThumbs[0]) $(iframeThumbs[0]).click();
}

function results_slide_left_iframe() {
  let newIndex = (iframeThumbnailIndex - 1 + iframeThumbs.length) % iframeThumbs.length;
  $(iframeThumbs[newIndex]).click();
}

function results_slide_right_iframe() {
  let newIndex = (iframeThumbnailIndex + 1) % iframeThumbs.length;
  $(iframeThumbs[newIndex]).click();
}

// ----------------------------- VIDEO LOGIC -----------------------------
const videoIds = ['toy_video', 'barb_video', 'scissors_video', 'carrot_knife_video', 'redbox_video', 'drawer_video', 'stapler_video', 'lamp_video', 'switch_video', 'vacuum_video'];
let videoThumbnailIndex = 0;
let videoThumbs = [];

function showVideo(idToShow) {
  videoIds.forEach(id => {
    const container = document.getElementById(id);
    if (container) {
      const vid = container.querySelector('video');
      if (id === idToShow) {
        container.classList.add('show');
        vid.play();
      } else {
        container.classList.remove('show');
        vid.pause();
        vid.currentTime = 0;
      }
    }
  });
}

function initializeVideoFlow() {
  videoThumbs = $(".thumbnail-btn.video-thumb").toArray();

  videoThumbs.forEach((btn, index) => {
    $(btn).on("click", function () {
      videoThumbnailIndex = index;
      $(".thumbnail-btn.video-thumb").css('opacity', '');
      $(btn).css('opacity', '1.0');

      const videoId = $(btn).attr('id').replace('-thumb', '') + '_video';
      showVideo(videoId);

      const slider = document.getElementById('results-objs-scroll');
      if (slider) {
        slider.scrollLeft = btn.offsetLeft - slider.offsetWidth / 2;
      }
    });
  });

  if (videoThumbs[0]) $(videoThumbs[0]).click();
}

function results_slide_left_video() {
  let newIndex = (videoThumbnailIndex - 1 + videoThumbs.length) % videoThumbs.length;
  $(videoThumbs[newIndex]).click();
}

function results_slide_right_video() {
  let newIndex = (videoThumbnailIndex + 1) % videoThumbs.length;
  $(videoThumbs[newIndex]).click();
}
