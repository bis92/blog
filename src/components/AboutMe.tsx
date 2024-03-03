const TITLE_CLASS = 'font-bold text-2xl text-gray-800 my-2';

export default function AboutMe() {
  return (
    <section className='bg-gray-100 shadow-lg p-8 m-8 text-center'>
      <div className='w-full text-center'>
        <h3 className={TITLE_CLASS}>Who Am I?</h3>
        <p>개발을 사랑하는 풀스택 개발자<br />
        대한민국의 보안에 기여하는 웹앱을 만들고 있음</p>
      </div>
      <div className='w-full text-center'>
        <h3 className={TITLE_CLASS}>Career</h3>
        <p>그린아이티코리아(2021.6-Now)</p>
      </div>
      <div className='w-full text-center'>
        <h3 className={TITLE_CLASS}>Skills</h3>
        <p>React, Node<br/>
        Git, SVN<br/>
        VS Code, Postgresql, MongoDB
        </p>
      </div>
    </section>
  );
}

