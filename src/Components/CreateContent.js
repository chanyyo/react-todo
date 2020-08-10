import React, {Component} from 'react';
class CreateContent extends Component {
  render() {
    return (
      <article>
        <h2>Create</h2>
        <form
          action="/create_process/"
          method="post"
          onSubmit={(e) => {
            e.preventDefault();
            this.props.onSubmit(e.target.title.value, e.target.desc.value);
            //  e.taget => form 을 가리키고, title => name , value는 input안의 text를 가리킴!!
            // submit 눌렀을때 action에 해당되는
            // page로 이동되는것을 방지
          }}
          // form 고유의기능 submit 클릭했을때
          // sumbit btn에 포함하는 form tag에
          // onSubmit을 설치하면 실행되도록 약속되있음
        >
          <p>
            <input type="text" name="title" placeholder="value"></input>
          </p>
          <p>
            <textarea name="desc" placeholder="description"></textarea>
          </p>
          <p>
            <input type="submit"></input>
          </p>
        </form>
      </article>
    );
  }
}
export default CreateContent;
