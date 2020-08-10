import React, {Component} from 'react';
class TOC extends React.Component {
  shouldComponentUpdate(newProps, newState) {
    console.log(newProps.data, this.props.data);
    // newProps.data => 최신 data
    // props.data => 원본 data 값을 알수있음
    // return 값이 true면 render호출 / false면 render는 호출x
    // 새로바뀐값과 이전값을 접근할수있음
    // render보다 더 빨리 호출된다.
    // TOC로 들어오는 data의 props의 값이 변경됐을 때, rende가 호출되고
    // 변경되지않을 때는 render가 호출되지않다면 얼마나좋을까?
    if (this.props.contents === newProps.contents) {
      // 이전 data가 바뀌지않았다면 render 호출x
      return false;
    }
    // 이전 dat가 변경되면 render 호출
    return true;
  }
  render() {
    console.log('===========TOC');
    // a태그안에 this.props.data는 App.js의 data를 가리킴

    // let lists = [];
    // const { data } = this.props;
    // for (let i = 0; i < data.length; i += 1) {
    //   lists.push(
    //     <li key={data[i].id}>
    //       <a
    //         href={data[i].id}
    //         data-id={data[i].id}
    //         onClick={(e) => {
    //           e.preventDefault();
    //           this.props.onChangePage(e.target.dataset.id);
    //           // e.target.dataset.id는 클릭했을때 debugger해놓고
    //           // console에 e를 입력하면 target이 가리키는게 보임
    //           // 여기선 a인데 a는 onClick을 감싸는 a태그 전부를말함
    //           // target객체안의 key인 dataset의 value는 id
    //           // 그러므로 e.taget.dataset.id는
    //           // a태그안에서 data- 생성해서 만든
    //           // data[i].id가 됨

    //           /* 이 props를 통해서
    //           App.js의 onChangePage함수를 실행함 */
    //         }}
    //       >
    //         {data[i].title}
    //       </a>
    //     </li>
    //   );
    // }
    return (
      <nav>
        <ul>
          {this.props.contents.map((content) => (
            <li key={content.id}>
              {/* content => toc안에 props content이고
                   그건 state안에 content이고
                   .id하므로 cotent안에 id를 가리킨다. */}

              <a
                href={content.id}
                data-id={content.id}
                onClick={(e) => {
                  e.preventDefault();
                  this.props.onChangePage(e.target.dataset.id);
                  // e.target.dataset.id는 클릭했을때 debugger해놓고
                  // console에 e를 입력하면 target이 가리키는게 보임
                  // 여기선 a인데 a는 onClick을 감싸는 a태그 전부를말함
                  // target객체안의 key인 dataset의 value는 id
                  // 그러므로 e.taget.dataset.id는
                  // a태그안에서 data- 생성해서 만든
                  // data.id가 됨

                  /* 이 props를 통해서
        App.js의 onChangePage함수를 실행함 */
                }}
              >
                {content.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

export default TOC;
