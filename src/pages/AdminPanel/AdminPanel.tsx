import './AdminPanel.scss';

// Here you can change the data of vocab categories, words etc. Just choose category and work. Good luck :3
const AdminPanel = (): JSX.Element => {
  return (
    <div className='admin-panel'>
      <div className='container admin-panel__container'>
        <h1 className='admin-panel__title'>Admin panel</h1>
        <p className='admin-panel__info'>
          Welcome!!! Click categories link and start editing process. Hope you are enjoy :3
        </p>
      </div>
    </div>
  );
};

export default AdminPanel;
