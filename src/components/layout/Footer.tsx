
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-sce-secondary text-white">
      <div className="sce-container py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">SCE Фонд</h3>
            <p className="text-gray-300 mb-4">
              Организация по Обеспечению, Контролю и Исследованию аномалий.
            </p>
            <p className="text-gray-300">
              Secure. Control. Explore.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Ссылки</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white">Главная</Link>
              </li>
              <li>
                <Link to="/objects" className="text-gray-300 hover:text-white">SCE Объекты</Link>
              </li>
              <li>
                <Link to="/posts" className="text-gray-300 hover:text-white">Новости</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white">О нас</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-white">Политика конфиденциальности</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Контакты</h3>
            <p className="text-gray-300 mb-2">
              Email: contacts@sce-foundation.net
            </p>
            <p className="text-gray-300 mb-2">
              Служба поддержки доступна с 9:00 до 18:00 (МСК)
            </p>
            <div className="mt-4">
              <p className="text-xs text-gray-400">
                Все материалы являются вымышленными и предназначены только для развлекательных целей.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {currentYear} SCE Фонд. Все права защищены.
            </p>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-4">
                <li>
                  <Link to="/terms" className="text-gray-400 hover:text-white text-sm">
                    Условия использования
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-gray-400 hover:text-white text-sm">
                    Конфиденциальность
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-400 hover:text-white text-sm">
                    Связаться с нами
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
