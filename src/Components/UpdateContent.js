import React, {Component} from 'react';
class UpdateContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.data.id,
      title: props.data.title,
      // contents.title = > data.title
      desc: props.data.desc,
    };
    this.inputFormHandler = this.inputFormHandler.bind(this);
    // inputFormHandler 함수를 쓸 대 마다 bind를 안써도 됨
  }

  inputFormHandler(e) {
    this.setState({[e.target.name]: e.target.value});

    // 이벤트가 발생하고 있는 tag의 이름을 알아내는 방법 (최신js기술)
    //  해당 tag의 name을 알아내줌!! ex) input 안의 name !
    // 결국  this.setState({title: e.target.value}); 똑같아짐
    // e.target.value => input안의 text
    // 예를들어, input이라면 input taget은
    // 매개변수 e => 호출되는 곳의 tag가리킴
    //  this.setState({title: e.target.value});
    //하지만 이렇게하면 title이 고정됨
  }

  render() {
    return (
      <article>
        <h2>Update</h2>
        <form
          action="/create_process/"
          method="post"
          onSubmit={(e) => {
            e.preventDefault();
            this.props.onSubmit(
              this.state.id,
              this.state.title,
              this.state.desc
            );
            //  e.taget => form 을 가리키고, title => name , value는 input안의 text를 가리킴!!
            // submit 눌렀을때 action에 해당되는
            // page로 이동되는것을 방지
          }}
          // form 고유의기능 submit 클릭했을때
          // sumbit btn에 포함하는 form tag에
          // onSubmit을 설치하면 실행되도록 약속되있음
        >
          {/* 업데이트 하려면 어디를 업데이트해야하는지 식별자가필요 
               보통 form에선 id를 사용할때 hidden type을 사용*/}
          <input type="hidden" name="id" value={this.state.id}></input>

          <p>
            <input
              type="text"
              name="title"
              placeholder="value"
              value={this.state.title}
              onChange={
                this.inputFormHandler

                //  console.log(e.target.value); // input tag안의 value 값이 들어오게됨.
                // 이러면 값이한글자씩만들어오게됨
                // this.setState({title: e.target.value}); // state에 동기화시킴
              }

              //  value = {this.data.title}하게되면 props의 값은 read only라 value 값을 수정못함
              // 가변화시키기  => state로 바꾼다. 하지만 여전히 수정되지않음
              // state가 바껴야하는 근거가없기때문
              // input 값을 변경했을때 state 값이 변경되야함
              // 이러기위해선 onChange 사용
            ></input>
          </p>

          <p>
            <textarea
              name="desc"
              placeholder="description"
              value={this.state.desc}
              onChange={
                //this는 UpdateContent 컴포넌트를 가리킴
                this.inputFormHandler // bind안해주면 this를 못읽음
                // this.setState({
                // desc: e.target.value,
              }

              //  1. 먼저, props => state로 변경
              //  2. state변경하기위해서 constructor에 state설정
              // 3. value에 state 변경
              // 4. 동적으로 움직이기위해 onChange사용
              // 5. setState 함수에서 textarea 안의
              //    value값을 state에 동기화시킴
            ></textarea>
          </p>
          <p>
            <input type="submit"></input>
          </p>
        </form>
      </article>
    );
  }
}
export default UpdateContent;
