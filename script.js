// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.

console.log(agoraStatesDiscussions);
let data;
const dataFromLocalStorage = localStorage.getItem("agoraStatesDiscussions");
if (dataFromLocalStorage) {
  data = JSON.parse(dataFromLocalStorage);
} else {
  data = agoraStatesDiscussions.slice();
  
}

const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div"); // div 요소 생성
  avatarWrapper.className = "discussion__avatar--wrapper"; // 클래스 이름 지정
  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of " + obj.author;
  avatarWrapper.append(avatarImg);

  const discussionContent = document.createElement("div"); // div 요소 생성
  discussionContent.className = "discussion__content"; // 클래스 이름 지정
  const titleMain = document.createElement("h2");
  titleMain.className = "discussion__title";
  const titleA = document.createElement("a");
  titleA.textContent = obj.title;
  titleA.href = obj.url;
  const inform = document.createElement("div");
  inform.className = "discussion__information";
  inform.textContent = `${obj.author} / ${obj.createdAt}`;

  titleMain.append(titleA);
  discussionContent.append(titleMain);
  discussionContent.append(inform);

  const discussionAnswered = document.createElement("div"); // div 요소 생성
  discussionAnswered.className = "discussion__answered"; // 클래스 이름 지정
  const answerP = document.createElement("p");
  answerP.textContent = obj.answer ? "☑" : "☒";
  discussionAnswered.append(answerP);

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  // agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// data 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element, from, to) => {
  console.log(from, to);
  if (!from && !to) {
    from = 0;
    to = data.length - 1;
  }
  // 다 지우고 배열에 있는 내용 다 보여주기
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
  for (let i = from; i < to; i += 1) {
    element.append(convertToDiscussion(data[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);
//  호출
const form = document.querySelector("form");
const author = document.querySelector("#input-name");
const title = document.querySelector("#input-title");
const textbox = document.querySelector("div.form__textbox > textarea");

//submit이벤트
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const obj = {
    id: "unique id",
    createdAt: new Date(),
    title: title.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions",
    author: author.value,
    answer: null,
    bodyHTML: textbox.value,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4",
  };
  data.unshift(obj);
  //로컬스토리지에 저장
  localStorage.setItem("agoraStatesDiscussions", JSON.stringify(data));
  //렌더링
  render(ul);
});
