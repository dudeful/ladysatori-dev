const ClassModulesNav = (props) => {
  return (
    <div>
      <a
        onClick={() => props.activeModule(props.module.id)}
        className={'nav-link module ' + (props.module.id === 'module_1' ? 'active navArrowTransition' : '')}
        href={'#0' + props.module.name.toLowerCase()}
        data-toggle='collapse'
        data-target={'#' + props.module.id + '_child'}
        aria-controls={props.module.id + '_child'}
        aria-expanded='false'
        role='tab'
        aria-selected='true'
        id={props.module.id}
      >
        <img className='dropdownNavArrow navArrowTransition' src={'/images/ClassRoom/hideNavArrow.png'} alt='...' />{' '}
        <span className='text-muted'>{'Módulo ' + props.module.id.slice(-1)}: </span>
        {props.module.name.replaceAll('_', ' ')}
      </a>
    </div>
  );
};

export default ClassModulesNav;
