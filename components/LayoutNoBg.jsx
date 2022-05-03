import Header from './Header'

const LayoutNoBg = props => (
  <div>
    <Header session={props.session} admin={props.admin} />
    <div className={!props.admin?"layout 2xl:mt-36 mt-20 2xl:ml-40 xl:ml-24":"layout 2xl:mt-10 2xl:ml-10"}>{props.children}</div>

    
    <style jsx global>{`
      html {
        box-sizing: border-box;
      }

      *,
      *:before,
      *:after {
        box-sizing: inherit;
      }

      body {
        background-color:#ffffff;
        background-size: cover;
        margin: 0;
        padding: 0;
        font-size: 16px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
          Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
          'Segoe UI Symbol';
      }

      input,
      textarea {
        font-size: 16px;
      }

      button {
        cursor: pointer;
      }
    `}</style>
    <style jsx>{`
      .layout {
        padding: 0 2rem;
      }
    `}</style>
  </div>
)

export default LayoutNoBg
