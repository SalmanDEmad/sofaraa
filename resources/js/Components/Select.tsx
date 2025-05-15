import { forwardRef, useRef } from 'react';
import ReactSelect, { Props } from 'react-select';

// rgb(99, 102, 241)
export default forwardRef(function Select(props: Props, ref) {

  const localRef = useRef(null);

  return (
    <ReactSelect
      ref={localRef}
      className="basic-single"
      classNamePrefix="select"
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary25: 'rgb(238, 242, 255)',
          primary: 'rgb(99, 102, 241)',
        },
      })}
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          height: "40px"
        }),
      }}
      isSearchable={true}
      isClearable={true}

      {...props}
    />
  )
});
