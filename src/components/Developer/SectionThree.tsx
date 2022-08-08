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
          className="flex flex-col items-center justify-between px-4 py-20 md:flex-row md:border-none"
        >
          <div className="flex h-full w-full flex-col justify-center md:flex-row md:justify-between">
            <div
              className={`hidden grid-cols-2 grid-rows-2 place-items-center gap-2 md:grid md:w-1/2 ${
                inView ? 'fade-in-lr' : ''
              }`}
            >
              <div fade-in-lr="1">
                <Image
                  alt="https://www.flaticon.com/free-icons/administrator"
                  src="/images/admin.png"
                  width={150}
                  height={150}
                />
              </div>
              <div fade-in-lr="2">
                <Image
                  alt="https://www.flaticon.com/free-icons/programm"
                  src="/images/programming.png"
                  className="dark:invert"
                  width={150}
                  height={150}
                />
              </div>
              <div fade-in-lr="3">
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
              <div fade-in-lr="4">
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
                inView ? 'fade-in-rl' : ''
              }`}
            >
              <div className="flex w-fit flex-col">
                <h1
                  fade-in-rl="4"
                  className="text-3xl dark:text-emerald-500 md:text-right md:text-4xl"
                >
                  Other
                </h1>
                <h1
                  fade-in-rl="4"
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
                <p fade-in-rl="2" className="pt-4">
                  I have previous experience in Embedded firmware development.
                  This ranges from programming in C using nRF SDK 17 and Zephyr
                  OS, to programming in Lua and Python on OpenWRT edge gateways.
                </p>
                <p fade-in-lr="3" className="pt-4">
                  I also have experience in working as a backend developer,
                  primarily with Node.JS applications and Strapi CMS APIs.
                </p>
              </div>

              <div>
                <div className="float-left flex flex-col gap-2 md:hidden ">
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
                <h3 className="md:pt-4">Navy Sailor</h3>
                <p className="pt-4">
                  Before I became a developer, I was an IT systems administrator
                  in the Royal Australian Navy for six years.
                </p>
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
