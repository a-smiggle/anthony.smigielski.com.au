import { useThemeContext } from '@nextail/providers';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { InView } from 'react-intersection-observer';

function SectionThree() {
  const { theme } = useThemeContext();

  return (
    <InView triggerOnce threshold={0.75}>
      {({ inView, ref }) => (
        <section
          ref={ref}
          className={`flex flex-col items-center justify-between pt-4 md:min-h-[calc(100vh-4rem)] md:snap-center md:flex-row md:border-none`}
        >
          <div className="flex h-full w-full flex-col justify-between md:flex-row">
            <div className="hidden grid-cols-2 grid-rows-2 place-items-center gap-2 md:grid md:w-1/2">
              <div>
                <Image
                  alt="https://www.flaticon.com/free-icons/administrator"
                  src="/images/admin.png"
                  width={150}
                  height={150}
                />
              </div>
              <div>
                <Image
                  alt="https://www.flaticon.com/free-icons/programm"
                  src="/images/programming.png"
                  className="dark:invert"
                  width={150}
                  height={150}
                />
              </div>
              <div>
                {theme === 'dark' ? (
                  <Image
                    alt=""
                    src="/images/navy-light.png"
                    width={150}
                    height={150}
                  />
                ) : (
                  <Image
                    alt=""
                    src="/images/navy-dark.png"
                    width={150}
                    height={150}
                  />
                )}
              </div>
              <div>
                {theme === 'dark' ? (
                  <Image
                    alt=""
                    src="/images/embedded.png"
                    width={150}
                    height={150}
                  />
                ) : (
                  <Image
                    alt=""
                    src="/images/embedded-black.png"
                    width={150}
                    height={150}
                  />
                )}
              </div>
            </div>

            <div
              className={`flex flex-col justify-center md:w-1/2 ${
                inView ? 'fade-in-lr' : ''
              }`}
            >
              <div className="flex w-fit flex-col">
                <h1
                  fade-in-lr="4"
                  className="text-3xl dark:text-emerald-500 md:text-right md:text-4xl"
                >
                  Other
                </h1>
                <h1
                  fade-in-lr="4"
                  className="text-5xl dark:text-emerald-500 md:text-6xl"
                >
                  Experience
                </h1>
              </div>

              <h3 className="pt-4">Developer</h3>
              <div>
                <div className="float-right">
                  <div className="flex flex-col gap-2 md:hidden">
                    <Image
                      alt="https://www.flaticon.com/free-icons/programm"
                      src="/images/programming.png"
                      className="dark:invert"
                      width={50}
                      height={50}
                    />
                    {theme === 'dark' ? (
                      <Image
                        alt=""
                        src="/images/embedded.png"
                        width={50}
                        height={50}
                      />
                    ) : (
                      <Image
                        alt=""
                        src="/images/embedded-black.png"
                        width={50}
                        height={50}
                      />
                    )}
                  </div>
                </div>
                <p fade-in-lr="2" className="pt-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Mauris nunc congue nisi vitae suscipit tellus mauris a. A diam
                  sollicitudin tempor id. Ut porttitor leo a diam sollicitudin
                  tempor id. Phasellus egestas tellus rutrum tellus
                  pellentesque. Massa tempor nec feugiat nisl pretium fusce id
                  velit ut. Blandit volutpat maecenas volutpat blandit aliquam.
                  Nam libero justo laoreet sit. Arcu dui vivamus arcu felis
                  bibendum ut tristique et egestas. Eu consequat ac felis donec
                  et odio pellentesque diam volutpat. Pellentesque adipiscing
                  commodo elit at imperdiet. Nibh praesent tristique magna sit
                  amet purus gravida quis. Lacus sed viverra tellus in hac. Sed
                  euismod nisi porta lorem mollis aliquam ut. Sed augue lacus
                  viverra vitae congue eu consequat. Dolor sit amet consectetur
                  adipiscing elit pellentesque. Et odio pellentesque diam
                  volutpat commodo sed egestas. Semper viverra nam libero justo
                  laoreet sit amet cursus. Volutpat sed cras ornare arcu dui.
                  Quisque id diam vel quam elementum pulvinar etiam non quam.
                </p>
              </div>

              <div>
                <h3 className="pt-4">Navy Sailor</h3>
                <div className="float-right flex flex-col gap-2 md:hidden ">
                  {theme === 'dark' ? (
                    <Image
                      alt=""
                      src="/images/navy-light.png"
                      width={50}
                      height={50}
                    />
                  ) : (
                    <Image
                      alt=""
                      src="/images/navy-dark.png"
                      width={50}
                      height={50}
                    />
                  )}
                  <Image
                    alt="https://www.flaticon.com/free-icons/administrator"
                    src="/images/admin.png"
                    width={50}
                    height={50}
                  />
                </div>
              </div>

              <Link href="/resume">
                <a className="hidden animate-bounce text-center text-3xl text-emerald-500 hover:underline">
                  RESUME
                </a>
              </Link>
            </div>
          </div>
        </section>
      )}
    </InView>
  );
}

export default SectionThree;
