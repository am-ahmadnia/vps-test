import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Chart from 'react-google-charts';
import { setHeaderPath } from './../../../actions/uiActions';
import PropTypes from 'prop-types';
import { Calendar } from 'react-modern-calendar-datepicker';
import { fetchProjects } from './../../../actions/projectActions';
import isEmpty from 'is-empty';

function Home({ user, setHeaderPath, fetchProjects, projects }) {
  const [selectedDay, setSelectedDay] = useState(null);
  useEffect(() => {
    setHeaderPath([]);
    if (isEmpty(projects)) fetchProjects(localStorage.jwtToken);
  }, []);
  return (
    <Fragment>
      <div class="row">
        <div class="col-xl-12">
          <div class="card-box">
            <div class="dropdown pull-right">
              <a
                href="#"
                class="dropdown-toggle arrow-none card-drop"
                data-toggle="dropdown"
                aria-expanded="false"
              >
                <i class="mdi mdi-dots-vertical"></i>
              </a>
              <div class="dropdown-menu dropdown-menu-right">
                <a href="javascript:void(0);" class="dropdown-item">
                  Action
                </a>
                <a href="javascript:void(0);" class="dropdown-item">
                  Another action
                </a>
                <a href="javascript:void(0);" class="dropdown-item">
                  Something else
                </a>
                <a href="javascript:void(0);" class="dropdown-item">
                  Separated link
                </a>
              </div>
            </div>

            <h4 class="header-title m-t-0 m-b-30">پروژه ها</h4>
            <div class="wrapper">
              <div class="gantt" style={{ marginTop: '15px' }}>
                <div class="gantt__row gantt__row--months">
                  <div class="gantt__row-first"></div>
                  <span>فروردین</span>
                  <span>اردیبهشت</span>
                  <span>خرداد</span>
                  <span>تیر</span>
                  <span>مرداد</span>
                  <span>شهریور</span>
                  <span>مهر</span>
                  <span>آبان</span>
                  <span>آذر</span>
                  <span>دی</span>
                  <span>بهمن</span>
                  <span>اسفند</span>
                </div>
                <div class="gantt__row gantt__row--lines" data-month="5">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span class="marker"></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div class="gantt__row">
                  <div class="gantt__row-first">پروژه الف</div>
                  <ul class="gantt__row-bars">
                    <li
                      style={{ gridColumn: '3/12', backgroundColor: '#2ecaac' }}
                    >
                      سلام
                    </li>
                  </ul>
                </div>
                <div class="gantt__row gantt__row--empty">
                  <div class="gantt__row-first">پروژه ب</div>
                  <ul class="gantt__row-bars"></ul>
                </div>
                <div class="gantt__row">
                  <div class="gantt__row-first">پروژه ج</div>
                  <ul class="gantt__row-bars">
                    <li
                      style={{ gridColumn: '2/5', backgroundCcolor: '#2ecaac' }}
                    >
                      Start Februar 🙌
                    </li>
                    {
                      // <li
                      //   style={{ gridColumn: '1/6', backgroundColor: '#ff6252' }}
                      //   // class="stripes"
                      // ></li>
                      // <li
                      //   style={{ gridCcolumn: '7/11', backgroundColor: '#54c6f9' }}
                      // >
                      //   Same line
                      // </li>
                    }
                  </ul>
                </div>
                <div class="gantt__row">
                  <div class="gantt__row-first">پروژه د</div>
                  <ul class="gantt__row-bars">
                    <li
                      style={{ gridColumn: '2/5', backgroundColor: '#2ecaac' }}
                    ></li>
                  </ul>
                </div>
                <div class="gantt__row gantt__row--empty">
                  <div class="gantt__row-first">پروژه ت</div>
                  <ul class="gantt__row-bars"></ul>
                </div>
                <div class="gantt__row">
                  <div class="gantt__row-first">پروژه پ</div>
                  <ul class="gantt__row-bars">
                    <li
                      style={{ gridColumn: '2/5', backgroundColor: '#2ecaac' }}
                    ></li>
                  </ul>
                </div>
                <div class="gantt__row">
                  <div class="gantt__row-first">پروژه ث</div>
                  <ul class="gantt__row-bars">
                    <li
                      style={{ gridColumn: '3/8', backgroundColor: '#54c6f9' }}
                    >
                      Long project
                    </li>
                  </ul>
                </div>

                <div class="gantt__row">
                  <div class="gantt__row-first">پروژه م</div>
                  <ul class="gantt__row-bars">
                    <li
                      style={{ gridColumn: '4/9', backgroundColor: '#ff6252' }}
                      class="stripes"
                    >
                      A title
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-xl-12">
          <div class="card-box">
            <div class="dropdown pull-right">
              <a
                href="#"
                class="dropdown-toggle arrow-none card-drop"
                data-toggle="dropdown"
                aria-expanded="false"
              >
                <i class="mdi mdi-dots-vertical"></i>
              </a>
              <div class="dropdown-menu dropdown-menu-right">
                <a href="javascript:void(0);" class="dropdown-item">
                  Action
                </a>
                <a href="javascript:void(0);" class="dropdown-item">
                  Another action
                </a>
                <a href="javascript:void(0);" class="dropdown-item">
                  Something else
                </a>
                <a href="javascript:void(0);" class="dropdown-item">
                  Separated link
                </a>
              </div>
            </div>

            <h4 class="header-title m-t-0 m-b-30">پروژه ها</h4>
            <div class="wrapper">
              <div class="gantt" style={{ marginTop: '15px' }}>
                <div class="gantt__row gantt__row--months">
                  <div class="gantt__row-first"></div>
                  <span>فروردین</span>
                  <span>اردیبهشت</span>
                  <span>خرداد</span>
                  <span>تیر</span>
                  <span>مرداد</span>
                  <span>شهریور</span>
                  <span>مهر</span>
                  <span>آبان</span>
                  <span>آذر</span>
                  <span>دی</span>
                  <span>بهمن</span>
                  <span>اسفند</span>
                </div>
                <div class="gantt__row gantt__row--lines" data-month="5">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span class="marker"></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div class="gantt__row">
                  <div class="gantt__row-first">پروژه الف</div>
                  <ul class="gantt__row-bars">
                    <li
                      style={{ gridColumn: '3/12', backgroundColor: '#2ecaac' }}
                    >
                      سلام
                    </li>
                  </ul>
                </div>
                <div class="gantt__row gantt__row--empty">
                  <div class="gantt__row-first">پروژه ب</div>
                  <ul class="gantt__row-bars"></ul>
                </div>
                <div class="gantt__row">
                  <div class="gantt__row-first">پروژه ج</div>
                  <ul class="gantt__row-bars">
                    <li
                      style={{ gridColumn: '2/5', backgroundCcolor: '#2ecaac' }}
                    >
                      Start Februar 🙌
                    </li>
                    {
                      // <li
                      //   style={{ gridColumn: '1/6', backgroundColor: '#ff6252' }}
                      //   // class="stripes"
                      // ></li>
                      // <li
                      //   style={{ gridCcolumn: '7/11', backgroundColor: '#54c6f9' }}
                      // >
                      //   Same line
                      // </li>
                    }
                  </ul>
                </div>
                <div class="gantt__row">
                  <div class="gantt__row-first">پروژه د</div>
                  <ul class="gantt__row-bars">
                    <li
                      style={{ gridColumn: '2/5', backgroundColor: '#2ecaac' }}
                    ></li>
                  </ul>
                </div>
                <div class="gantt__row gantt__row--empty">
                  <div class="gantt__row-first">پروژه ت</div>
                  <ul class="gantt__row-bars"></ul>
                </div>
                <div class="gantt__row">
                  <div class="gantt__row-first">پروژه پ</div>
                  <ul class="gantt__row-bars">
                    <li
                      style={{ gridColumn: '2/5', backgroundColor: '#2ecaac' }}
                    ></li>
                  </ul>
                </div>
                <div class="gantt__row">
                  <div class="gantt__row-first">پروژه ث</div>
                  <ul class="gantt__row-bars">
                    <li
                      style={{ gridColumn: '3/8', backgroundColor: '#54c6f9' }}
                    >
                      Long project
                    </li>
                  </ul>
                </div>

                <div class="gantt__row">
                  <div class="gantt__row-first">پروژه م</div>
                  <ul class="gantt__row-bars">
                    <li
                      style={{ gridColumn: '4/9', backgroundColor: '#ff6252' }}
                      class="stripes"
                    >
                      A title
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xl-6">
          <div class="card-box">
            <div class="dropdown pull-right">
              <a
                href="#"
                class="dropdown-toggle arrow-none card-drop"
                data-toggle="dropdown"
                aria-expanded="false"
              >
                <i class="mdi mdi-dots-vertical"></i>
              </a>
              <div class="dropdown-menu dropdown-menu-right">
                <a href="javascript:void(0);" class="dropdown-item">
                  Action
                </a>
                <a href="javascript:void(0);" class="dropdown-item">
                  Another action
                </a>
                <a href="javascript:void(0);" class="dropdown-item">
                  Something else
                </a>
                <a href="javascript:void(0);" class="dropdown-item">
                  Separated link
                </a>
              </div>
            </div>

            <h4 class="header-title m-t-0 m-b-30">توزیع کار</h4>
            <Chart
              width={'500px'}
              height={'300px'}
              chartType="PieChart"
              loader={<div>Loading Chart</div>}
              data={[
                ['Task', 'Hours per Day'],
                ['پروژه الف÷', 11],
                ['', 2],
                ['', 2],
                [' TV', 2],
                ['', 7],
              ]}
              // options={{
              //   title: '',
              // }}
              rootProps={{ 'data-testid': '1' }}
            />
          </div>
        </div>
        {user.role === 'manager' && (
          <div class="col-xl-6">
            <div class="card-box">
              <div class="dropdown pull-right">
                <a
                  href="#"
                  class="dropdown-toggle arrow-none card-drop"
                  data-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i class="mdi mdi-dots-vertical"></i>
                </a>
                <div class="dropdown-menu dropdown-menu-right">
                  <a href="javascript:void(0);" class="dropdown-item">
                    Action
                  </a>
                  <a href="javascript:void(0);" class="dropdown-item">
                    Another action
                  </a>
                  <a href="javascript:void(0);" class="dropdown-item">
                    Something else
                  </a>
                  <a href="javascript:void(0);" class="dropdown-item">
                    Separated link
                  </a>
                </div>
              </div>

              <h4 class="header-title m-t-0 m-b-30">توزیع تیم</h4>
              <Chart
                width={'500px'}
                height={'300px'}
                chartType="BarChart"
                loader={<div>Loading Chart</div>}
                data={[
                  [
                    'City',
                    '2010 Population',
                    '2000 Population',
                    '2099 Population',
                  ],
                  ['New York City, NY', 8175000, 8008000, 8008000],
                  ['Los Angeles, CA', 3792000, 3694000, 3694000],
                  ['Chicago, IL', 2695000, 2896000, 2896000],
                  ['Houston, TX', 2099000, 1953000, 1953000],
                  ['Philadelphia, PA', 1526000, 1517000, 1517000],
                ]}
                options={{
                  title: 'Population of Largest U.S. Cities',
                  chartArea: { width: '50%' },
                  isStacked: true,
                  hAxis: {
                    title: 'Total Population',
                    minValue: 0,
                  },
                  vAxis: {
                    title: 'City',
                  },
                }}
                // For tests
                rootProps={{ 'data-testid': '3' }}
              />
            </div>
          </div>
        )}
      </div>
      <div class="row">
        <div class="col-md-4">
          <div class="card-box calendar-box">
            <Calendar
              value={selectedDay}
              onChange={setSelectedDay}
              locale="fa" // add this
              shouldHighlightWeekends
              // calendarClassName="responsive-calendar" // added this
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

Home.propTypes = {
  user: PropTypes.object.isRequired,
  projects: PropTypes.array.isRequired,
  setHeaderPath: PropTypes.func.isRequired,
  fetchProjects: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  projects: state.project.projects,
});

export default connect(mapStateToProps, { setHeaderPath, fetchProjects })(Home);
