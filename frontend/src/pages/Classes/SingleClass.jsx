import {useLoaderData} from 'react-router-dom'
import useUser from '../../hooks/useUser'
import { useState } from 'react';
import useAxiosFetch from '../../hooks/useAxiosFetch';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { FaLanguage, FaLevelUpAlt, FaUser, FaUsers } from 'react-icons/fa';
import { MdBookOnline } from 'react-icons/md';
import { BiTime } from 'react-icons/bi';
import bannerImg1 from "../../assets/home/banner-1.jpg";

const SingleClass = () => {
    const course = useLoaderData()
    //console.log(course);
    const {currentUser} = useUser();
    //console.log(currentUser?.role);
    const role = currentUser?.role
    const [enrolledClasses, setEnrolledClasses] = useState([]);
    const axiosFetch = useAxiosFetch();
    const axiosSecure = useAxiosSecure();

    const handleSelect = (id) => {
        if (!currentUser || !currentUser.email) {
          alert("Please Login First!");
          return navigate("/login");
        }
      
        axiosSecure.get(`/cart-item/${id}?email=${currentUser.email}`)
          .then((res) => {
            if (res.data.classId === id) {
              console.log(`Class ${id} is already selected`);
              return alert("Already Selected");
            } else if (enrolledClasses.find(item => item.classId._id === id)) {
              return alert("Already Enrolled");
            } else {
              const data = {
                classId: id,
                userMail: currentUser.email,
                date: new Date()
              };
              axiosSecure.post('/add-to-cart', data)
                .then((res) => {
                  //setEnrolledClasses([...enrolledClasses, { classId: id }]);
                  alert("Successfully added to the cart");
                  console.log(res.data);
                })
                .catch((err) => {
                  console.error("Error adding to cart:", err);
                  alert("Failed to add class to cart");
                });
            }
          })
    };
    
return (
    <>
    <div 
    className='font-gilroy font-medium text-gray dark:text-white text-lg leading-[27px] w-[90%] mx-auto'
    data-new-gr-c-s-check-loaded= "14.1157.0"
    data-gr-ext-installed=""
    >
    
    {/*breadcrumb or header*/}
    <div className='breadcrumbs bg-blue-300 py-20 mt-20 seccion-pading bg-cover bg-center bg-no-repeat'>
        <div className='container text-center'>
            <h2>Course Details</h2>
        </div>
    </div>

    <div className='nav-tab-wrapper tabs section-padding-mt-8'>
        <div className='container'>
            <div className='grid grid-cols-12 md:gap-[30px]'>
                {/*left side*/}
                <div className='lg:col-span-8 col-span-12'>
                    <div className='single-course-details'>
                        <div className='xl:h-[470px] h-[350px] mb-10 course-main-thumb'>
                            <img src={course?.image}
                                alt=""
                                className='rounded-md object-fut w-full h-full block'
                                />
                        </div>
                        <h2 className='text-2xl mb-2'>{course?.name}</h2>

                        <div className='author-meta mt-6 sm:flex lg:space-x-16 sm:space-x-5 space-y-5 sm:space-y-0 items center'>
                            <div className='flex space-x-4 items-center group'>
                                <div className='flex-none'>
                                    <div className='h-12 w-12 rounded'>
                                        <img 
                                        src="https://res.cloudinary.com/peloton-cycle/image/fetch/dpr_2.0,f_auto,q_auto:good,w_230/https://s3.amazonaws.com/workout-metric-images-prod/06a190c517624debbd6780ef03d67247" 
                                        alt="girlImage" 
                                        className='object-cover w-full h-full rounded'
                                        />
                                    </div>
                                </div>
                                <div className='flex-1'>
                                    <p className='text-secondary'>
                                        Trainer
                                        <a href="#" className='text-black'>
                                            : {course?.instructorName}
                                        </a>
                                    </p>
                                </div>
                            </div>
                            <div>
                                <span className='text-secondary'>
                                    Last Update:
                                    <a href="#" className='text-black ml-1'>
                                        {new Date(course?.submitted).toLocaleDateString()}
                                    </a>
                                </span>
                            </div>
                        </div>

                        <div className='nav-tab-wrapper mt-12'>
                            <ul id='tabs-nav' className='course-tab mb-8'>
                                <li className='active'>
                                    <a href="#tab1">Overview</a>
                                </li>
                                <li>
                                    <a href="#tab2">Curriculum</a>
                                </li>
                                <li>
                                    <a href="#tab3">Instructor</a>
                                </li>
                                <li>
                                    <a href="#tab4">Reviews</a>
                                </li>
                            </ul>
                            <div className='tabs-content'>
                                <div id='tab1' className='tab-content'>
                                    <div>
                                        <h3 className='text-2xl mt-8'>Course Description</h3>
                                        <p className='mt-4'>
                                            This tutorial will help you learn quickly and thoroughly. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis minus nesciunt eveniet, eligendi fuga qui perspiciatis commodi voluptatibus iste facere ut maxime sint reprehenderit vero alias reiciendis, nostrum, eum enim.
                                            <br /><br /> You'll be exposed to principles and strategies, but, more importantly, you'll learn how actually apply these abstract concepts by coding three differents websites for three very different the audiences. Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis, ex rem totam sint numquam fugit exercitationem recusandae explicabo eveniet atque vel adipisci quod tempore iure ipsam a quidem, architecto temporibus!
                                        </p>
                                        <div className='bg-[#F8F8F8] dark:bg-indigo-500 space-y-6 p-8 rounded-md my-8'>
                                            <h4 className='text-2xl'>This Course is for Beginners</h4>
                                        </div>
                                        <div>
                                            <h4 className='text-2xl'>What You'll learn?</h4>
                                            <p className='mt-4'>
                                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque, qui? Voluptates officia veritatis excepturi voluptatibus numquam quasi, magnam, sapiente sunt expedita repudiandae error commodi quis tenetur vero harum? Cupiditate, ratione.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/*rigth side*/}
                <div className='lg:col-span-4 col-span-12 mt-8 md:mt-0'>
                    <div className='sidebarWrapper space-y-[30px]'>
                        <div className='widget custom-text space-y-5'>
                            <a className='h-[220px] rounded relative block' href="#">
                                <img 
                                src={course?.image} 
                                alt=""
                                className='block w-full h-full object-cover rounded' 
                                />
                                <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
                                <img src="./play.png" alt="" />
                                </div>
                            </a>
                            <h3>${course?.price}</h3>
                            <button onClick={() => handleSelect(course._id)} title={role === 'admin' || role === 'instructor' ? 'Instructor/Admin Can not be able to select ' ?
                                course.availableSeats < 1 : "Not seat avalible" : 'You can select this classes'} disabled= {role === 'admin' || 
                                    role === "instructor" || course.availableSeats < 1} className='btn btn-primary w-full text-center bg-secondary py-2 px-6 text-white'>
                                    Enrolled Now
                            </button>
                            <ul className='list'>
                                <li className='flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0'>
                                    <div className='flex-1 space-x-3 flex items-center'>
                                        <FaUser className='inline-flex' />
                                        <div className='text-black font-semibold'>
                                            Instructor
                                        </div>
                                    </div>
                                    <div className='flex-none'>{course?.instructorName}</div>
                                </li>

                                <li className='flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0'>
                                    <div className='flex-1 space-x-3 flex items-center'>
                                        <MdBookOnline />
                                        <div className='text-black font-semibold'>
                                            Lectures
                                        </div>
                                    </div>
                                    <div className='flex-none'>23</div>
                                </li>

                                <li className='flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0'>
                                    <div className='flex-1 space-x-3 flex items-center'>
                                        <BiTime />
                                        <div className='text-black font-semibold'>
                                            Duration
                                        </div>
                                    </div>
                                    <div className='flex-none'>2hs 36minutes</div>
                                </li>

                                <li className='flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0'>
                                    <div className='flex-1 space-x-3 flex items-center'>
                                        <FaUsers />
                                        <div className='text-black font-semibold'>
                                            Enrolled
                                        </div>
                                    </div>
                                    <div className='flex-none'>{course?.totalEnrolled}</div>
                                </li>

                                <li className='flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0'>
                                    <div className='flex-1 space-x-3 flex items-center'>
                                        <FaLevelUpAlt />
                                        <div className='text-black font-semibold'>
                                            Course Level
                                        </div>
                                    </div>
                                    <div className='flex-none'>Intermediate</div>
                                </li>

                                <li className='flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0'>
                                    <div className='flex-1 space-x-3 flex items-center'>
                                        <FaLanguage />
                                        <div className='text-black font-semibold'>
                                            Language
                                        </div>
                                    </div>
                                    <div className='flex-none'>English</div>
                                </li>
                            </ul>
                            <ul className='flex space-x-4 items-center pt-3'>
                                <li className='text-black font-semibold'>Share On:</li>
                                <li>
                                    <a href="#" className='flex h-10 w-10'>
                                        <img src="/logo.png" alt="" />
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className='flex h-10 w-10'>
                                        <img src="/logo.png" alt="" />
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className='flex h-10 w-10'>
                                        <img src="/logo.png" alt="" />
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className='flex h-10 w-10'>
                                        <img src="/logo.png" alt="" />
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className='widget'>
                            <h4 className='widget-title'>Related Courses</h4>
                            <ul className='list'>
                                <li className='flex space-x-4 border-[#ECECEC] pb-6 mb-6 last:pb-0 last:mb-0 last:border-0 border-b'>
                                    <div className='flex-none'>
                                        <div className='h-20 w-20 rounded'>
                                            <img 
                                            src={bannerImg1} 
                                            alt=""
                                            className='w-full h-full object-cover rounded'
                                            />
                                        </div>
                                    </div>
                                    <div className='flex-1'>
                                        <div className='flex space-x-3 mb-2'>
                                            <iconify-icon
                                            icon="heroicons:star-20-solid"
                                            className="text-tertiary"
                                            ></iconify-icon>
                                            <iconify-icon
                                            icon="heroicons:star-20-solid"
                                            className="text-tertiary"
                                            ></iconify-icon>
                                            <iconify-icon
                                            icon="heroicons:star-20-solid"
                                            className="text-tertiary"
                                            ></iconify-icon>
                                            <iconify-icon
                                            icon="heroicons:star-20-solid"
                                            className="text-tertiary"
                                            ></iconify-icon>
                                            <iconify-icon
                                            icon="heroicons:star-20-solid"
                                            className="text-tertiary"
                                            ></iconify-icon>
                                        </div>
                                        <div className='mb-1 font-semibold text-black'>
                                            Greatest Pasion In...
                                        </div>
                                        <span className='text-secondary font-semibold'>
                                            $38.00
                                        </span>
                                    </div>
                                </li>
                                <li className='flex space-x-4 border-[#ECECEC] pb-6 mb-6 last:pb-0 last:mb-0 last:border-0 border-b'>
                                    <div className='flex-none'>
                                        <div className='h-20 w-20 rounded'>
                                        <img 
                                            src={bannerImg1} 
                                            alt=""
                                            className='w-full h-full object-cover rounded'
                                            />
                                        </div>
                                    </div>
                                    <div className='flex-1'>
                                        <div className='mb-1 font-semibold text-black'>
                                            Greatest Passion In...
                                        </div>
                                        <span className='text-secondary font-semibold'>
                                            $38.00
                                        </span>
                                    </div>
                                </li>
                                <li className='flex space-x-4 border-[#ECECEC] pb-6 mb-6 last:pb-0 last:mb-0 last:border-0 border-b'>
                                    <div className='flex-none'>
                                        <div className='h-20 w-20 rounded'>
                                        <img 
                                            src={bannerImg1} 
                                            alt=""
                                            className='w-full h-full object-cover rounded'
                                            />
                                        </div>
                                    </div>
                                    <div className='flex-1'>
                                        <div className='mb-1 font-semibold text-black'>
                                            Greatest Passion In...
                                        </div>
                                        <span className='text-secondary font-semibold'>
                                            $38.00
                                        </span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    </div>
    </>
  )
}

export default SingleClass