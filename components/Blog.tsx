import Image from 'next/image';
import React from 'react';
import { InView } from 'react-intersection-observer';

function Blog() {
  return (
    <InView triggerOnce threshold={0.75}>
      {({ inView, ref }) => (
        <section
          ref={ref}
          className={`flex min-h-[calc(100vh-4rem)] flex-col pt-4 md:snap-center ${
            inView ? 'fade-in-tb' : ''
          }`}
        >
          <h1 fade-in-tb="1">Latest Articles</h1>
          <h2 fade-in-tb="2" className="text-center">
            Coming Soon
          </h2>
          <div fade-in-tb="3" className="flex flex-row justify-center">
            <Image
              alt="Under Construction"
              src="/images/under_construction.svg"
              width={500}
              height={500}
            />
          </div>
        </section>
      )}
    </InView>
  );
}

export default Blog;
