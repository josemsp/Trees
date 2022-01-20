import "./index.css";

export default function Tree () {
  return (
    <div className="tree">
      <p>root</p>
      <div className='tree'>
        <p>ant</p>
        <div className=''>
          <p>bear</p>
          <div className='tree'>
            <p>cat</p>
            <div className=''>
              <p>dog</p>
              <div className='tree'>
                <p>
                  elephant
                </p>
              </div>
            </div>
          </div>
        </div>
        <p>frog</p>
      </div>
    </div>
  );
}
