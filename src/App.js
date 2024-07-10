import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import AppLayout from './layout/AppLayout';
import Homepage from './pages/Homepage/Homepage';
import MoviePage from './pages/Movies/MoviePage';
import MovieDetailPage from './pages/MovieDetail/MovieDetailPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Transition, TransitionGroup } from 'react-transition-group';



const TIMEOUT = 500;

const getTransitionStyles = {
  entering: {
    position: 'absolute',
    opacity: 0,
  },
  entered: {
    transition: `opacity ${TIMEOUT}ms ease-in-out, transform ${TIMEOUT}ms ease-in-out`,
    opacity: 1,
  },
  exiting: {
    transition: `opacity ${TIMEOUT}ms ease-in-out, transform ${TIMEOUT}ms ease-in-out`,
    opacity: 0,
  },
};

function App() {
  const location = useLocation();

  return (
    <div className="relative ">
      <TransitionGroup style={{ position: 'relative' }}>
        <Transition
          key={location.pathname}
          timeout={{
            enter: TIMEOUT,
            exit: TIMEOUT,
          }}
        >
          {status => (
            <div
              style={{
                ...getTransitionStyles[status],
                backgroundColor: 'black', // 배경색을 검은색으로 설정
              }}
            >
              <Routes location={location}>
                <Route path="/" element={<AppLayout />}>
                  <Route index element={<Homepage />} />
                  <Route path="/movies">
                    <Route index element={<MoviePage />} />
                    <Route path=":id" element={<MovieDetailPage />} />
                  </Route>
                </Route>
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </div>
          )}
        </Transition>
      </TransitionGroup>
    </div>
  );
}

export default App;
