import React, {Component, useState, useEffect} from 'react';
import List from './Compon/List';

// const App = () => {
//   const [todos, setTodos] = useState('js');
//   const [newTodo, setNewTodo] = useState();
//   const ChangeInputData = (e) => {
//     setNewTodo(e.target.value);
//   };
//   const addTodo = (e) => {
//     e.preventDefalut();
//     setTodos([...todos, newTodo]);
//   };

//   useEffect(() => {
//     console.log('새로운 내용이 랜더링됐네요', todos);
//   }, [todos]);

//   return (
//     <div>
//       <h1>todo</h1>

//       <form action="./">
//         <input type="text" name="" onChange={ChangeInputData}></input>
//         <button onClick={addTodo}>할일추가</button>
//       </form>
//       <List todos={todos}></List>
//     </div>
//   );
// };
// export default App;

import Subject from './Components/Subject';
import TOC from './Components/TOC';
import ReadContent from './Components/ReadContent';
import Control from './Components/Control';
import CreateContent from './Components/CreateContent';
import UpdateContent from './Components/UpdateContent';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.max_content_id = 3;
    this.state = {
      mode: 'read',
      sleleted_cotent_id: 2, //기본값 설정
      welcome: {title: 'welcome', desc: 'Hellow, React!!'},
      subject: {title: 'WEB', sub: 'World Wide Web!'},
      contents: [
        {id: 1, title: 'HTML', desc: 'HTML is Markup Language'},
        {id: 2, title: 'CSS', desc: 'CSS is for design'},
        {id: 3, title: 'JavaScript', desc: 'JavaScript is interaction'},
      ],
    };
  }
  getReadContent() {
    for (let i = 0; i < this.state.contents.length; i++) {
      let data = this.state.contents[i];

      if (data.id === this.state.sleleted_cotent_id) {
        return data;
        //  TOC list를 클릭했을때 클릭한 data id 값과 같으면
        // this.state.contents 의 객체를 getReadContent함수에 return해라
        /*  화면에서 page누를때마다 다르게 표시되기위한 조건문 */
      }
    }
  }
  getContent() {
    let _title,
      _article,
      _desc = null;
    if (this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>;
    } else if (this.state.mode === 'read') {
      let _content = this.getReadContent();
      _article = (
        <ReadContent title={_content.title} desc={_content.desc}></ReadContent>
      );

      //mode가 create일떄는 CreateContent가 UI에 출력되도록할것
    } else if (this.state.mode === 'create') {
      _article = (
        <CreateContent
          onSubmit={(_title, _desc) => {
            console.log(_title, _desc);
            this.max_content_id = this.max_content_id + 1;
            let _contents = Array.from(this.state.contents);
            _contents.push({
              id: this.max_content_id,
              title: _title,
              desc: _desc,
            });
            // Array로 새로운 복제품을 만들고 거기에 push를하면
            // 원본이 바뀔위험이없다.

            // other method : let newContents = Array.from(this.state.content)
            // newContents.push({id :this.max_content_id, title :_title,desc :_desc});

            this.setState({
              //contetns : NewContents

              contents: _contents,
              mode: 'read',
              // mode가 read되면, 세부사항도 볼수있음
              sleleted_cotent_id: this.max_content_id,
              // id도 우리가 선택한 id로 변경함
            });
          }}

          // this.state.contents.push({id :this.max_content_id, title :_title,desc :_desc});
          //이렇게직접수정하면 react는모름
          // push를 하게되면 원본자체를 수정됨 concat을 이용하면 복제본만 수정됨
        ></CreateContent>
      );
    } else if (this.state.mode === 'update') {
      let _content = this.getReadContent();

      _article = (
        <UpdateContent
          data={_content}
          onSubmit={(_id, _title, _desc) => {
            let _contents = Array.from(this.state.contents); // contents를 복사함
            for (let i = 0; i < _contents.length; i++) {
              if (_contents[i].id === _id) {
                _contents[i] = {id: _id, title: _title, desc: _desc};
              }
            }
            // update = 수정하기  선택한 TOC list들을 update!!
            // 우리가 수정하려고하는 배열,객체는 개를 복제하고 수정한것을 넣는다!
            this.setState({
              contents: _contents,
              mode: 'read',
              sleleted_cotent_id: this.max_content_id,
            });
          }}
        ></UpdateContent>
      );
    }
    return _article;
    // getContent는 _article이란 값을 return 해줌
  }
  render() {
    return (
      <div className="App">
        <Subject // state안에 있는 subject.title가리킴
          title={this.state.subject.title} //subject.js로 전달
          sub={this.state.subject.sub} // title, sub (속성)을전달
          onChangePage={() => {
            this.setState({mode: 'welcome'});
          }} // Subject안에 있는 <a>태그를 누를때 setState실행되면서
          // mode가 read에서 welcome으로 변경
        ></Subject>

        <TOC // id = e.target.dataset.id
          onChangePage={(id) => {
            // id 매개변수를 sleleted_id로 주면
            this.setState({mode: 'read', sleleted_cotent_id: Number(id)});
          }}
          contents={this.state.contents}
        ></TOC>
        <Control
          // _mode는 Control.js의 onChangeMode('update')안의 update가리킴
          onChangeMode={(_mode) => {
            if (_mode === 'delete') {
              if (window.confirm('정말 삭제하겠습니까?')) {
                const _contents = this.state.contents.filter(
                  (content) => content.id !== this.state.sleleted_cotent_id
                );
                // let _contents = Array.from(this.state.contents);
                // // confirm 누르게되면 true가됨
                // let i = 0;
                // while (i < _contents.length) {
                //   if (_contents[i].id === this.state.sleleted_cotent_id) {
                //     _contents.splice(i, 1);

                //     // 0,1  html
                //     // 어디서부터 어디까지를 지울것인가
                //     // 발견한 id 값부터 1개를 지우겠다.
                //     // _contents의 원본을 바꿈
                //     break;
                //   }
                //   i = i + 1;
                // }
                // 삭제를 확인했다면 모드는 welcome
                //  목록은 하나를 삭제하 상태
                this.setState({
                  mode: 'welcome',
                  contents: _contents,
                });
                alert('deleted!');
              }
            } else {
              this.setState({
                mode: _mode, // 즉 mode : update / delete / create가
                // App 컴포넌트안의 mode에 추가됨
              });
            }
          }}
        ></Control>
        {this.getContent()}
        {/* _title / _desc 위치따라서 변하고싶은곳 지정함 */}
      </div>
    );
  }
}

// 상위가 하위 수정할땐 props
// 하위가 상위 수정할땐 state를 통해서한다.

export default App;
