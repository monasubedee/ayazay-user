import { Formik } from 'formik';
import { useContext } from 'react';
import { LangContext } from '../../constants/langcontext';

const DeliveryInfo = (props) => {
  
  const {lang,language} = useContext(LangContext);

  const {
    handleSelectRegion,
    handleSelectTownship,
    handleSelectCity,
    typeChange,
    selectedType,
    closebtn,
    handleSubmit,
    Values,
    validationSchema,
    regionOptions,
    cityOptions,
    townshipOptions,
  } = props;
  return (
    <div className='delivery_info'>
      <div className='delivery_info_container'>
        <div className='delivery_info_wrapper'>
          <span>{lang.deliveryInformation}</span>
          <Formik
            initialValues={Values}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              /* and other goodies */
            }) => {
              return (
                <form onSubmit={handleSubmit}>
                  <div className='info_inputs'>
                    <div className='input'>
                      <input
                        className='full_name'
                        type='text'
                        name='name'
                        placeholder={lang.fullName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                        required
                      />
                      {errors.name && touched.name ? (
                        <div className='error'>{errors.name}</div>
                      ) : (
                        ''
                      )}
                    </div>
                    <div className='input'>
                      <input
                        className='phone_number'
                        type='text'
                        name='phone_no'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder='09 1234 12345'
                        value={values.phone_no}
                        required
                      />
                      {errors.phone_no && touched.phone_no ? (
                        <div className='error'>{errors.phone_no}</div>
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                  <div className='address_info'>
                    <input
                      className='line_one'
                      type='text'
                      name='addressOne'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder={lang.address}
                      value={values.addressOne}
                      required
                    />
                    {errors.addressOne && touched.addressOne ? (
                      <div className='error_two'>{errors.addressOne}</div>
                    ) : (
                      ''
                    )}
                  </div>
                  {/*
                                    <div className="add_address">
                                        + ADD DELIVERY ADDRESS
                               </div> */}
                  <div className='dropdown_ctn address_info_two'>
                    <div className='custom-select'>
                      <select
                        className='dropdown_input'
                        onChange={handleSelectRegion}
                        name='region'
                        required='required'
                      >
                        <option value=''>{lang.selectRegion}</option>
                        {regionOptions !== null &&
                          regionOptions.map((item, key) => (
                            <option key={key} id={item.id} value={item.name_en}>
                              {language === 'en' ? item.name_en : item.name_mm}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className='township_ward'>
                      <select
                        className='dropdown_input'
                        onChange={handleSelectCity}
                        disabled={cityOptions.length === 0 ? true : false}
                        required='required'
                      >
                        <option value=''>{lang.selectTownship}</option>
                        {cityOptions.map((item, key) => (
                          <option key={key} id={item.id} value={item.name_en}>
                            {language === 'en' ? item.name_en : item.name_mm}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className='township_ward'>
                      <select
                        className='dropdown_input'
                        onChange={handleSelectTownship}
                        disabled={townshipOptions.length === 0 ? true : false}
                        required='required'
                      >
                        <option value=''>{lang.selectWard}</option>
                        {townshipOptions.map((item, key) => (
                          <option key={key} id={item.id} value={item.name_en}>
                            {language === 'en' ? item.name_en : item.name_mm}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className='effective_deli'>
                    <span>{lang.label}</span>
                    <div className='office_home' name='office_home' onChange={typeChange}>
                      <div className='home_ctn'>
                        <label className='labl'>
                          <input
                            type='radio'
                            id='home'
                            value='home'
                            checked={selectedType === 'home'}
                            onChange={typeChange}
                          />
                          <div className='home'>
                            <i className='fa fa-home' aria-hidden='true'></i>
                            <span>{lang.home}</span>
                          </div>
                        </label>
                      </div>
                      <div className='office_ctn'>
                        <label className='labl'>
                          <input
                            type='radio'
                            id='office'
                            value='office'
                            style={{
                              opacity: '1',
                            }}
                            checked={selectedType === 'office'}
                            onChange={typeChange}
                          />
                          <div className='home'>
                            <i className='fa fa-building' aria-hidden='true'></i>
                            <span>{lang.office}</span>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className='save_btn'>
                    <button type='submit'>{lang.save}</button>
                  </div>
                  {closebtn ? (
                    <div className='close_btn' onClick={closebtn}>
                      <a type='onclick'>{lang.cancel}</a>
                    </div>
                  ) : null}
                </form>
              );
            }}
          </Formik>
        </div>
      </div>
      <style jsx>
        {`
          .labl {
            display: block;
          }
          .labl > input {
            visibility: hidden;
            position: absolute;
          }
          .labl > input + div {
            cursor: pointer;
            border: 2px solid transparent;
          }
          .labl > input:checked + div {
            border: 1px solid #000000;
          }
          .home_ctn,
          .office_ctn {
            width: 50%;
          }
          .dropdown_ctn {
            display: flex;
            justify-content: space-between;
          }
          .dropdown_input {
            margin: 10px 5px;
            width: 100%;
            min-width: 200px;
            max-width: 200px;
            border: 1px solid #cbcbcb;
            background-color: #f4f5f8;
            border-radius: 8px;
            outline: none;
            display: inline-block;
            padding: 1em 2em 1em 1em;
            font: inherit;
            line-height: inherit;
            -webkit-appearance: none;
            -moz-appearance: none;
            -ms-appearance: none;
            appearance: none;
            background-repeat: no-repeat;
            background-image: linear-gradient(45deg, transparent 50%, currentColor 50%),
              linear-gradient(135deg, currentColor 50%, transparent 50%);
            background-position: right 15px top 1.5em, right 10px top 1.5em;
            background-size: 5px 5px, 5px 5px;
          }
          .office_ctn {
            padding-left: 20px;
          }
          .show_error {
            display: block;
            color: #aa222a;
          }
          .error {
            color: #aa222a;
            font-size: 15px;
            padding-top: 5px;
          }
          .error_two {
            padding-bottom: 15px;
            margin-top: -12px;
            color: #aa222a;
            font-size: 15px;
          }
          .no_error {
            display: none;
          }
          .input {
            width: 49%;
          }

          .delivery_info {
            padding: 0px 32px;
          }
          .delivery_info_wrapper span {
            font-size: 20px;
            font-weight: 600;
            color: #394358;
          }

          .delivery_info_wrapper {
            width: 100%;
            margin-top: 32px;
          }
          .special {
            padding-left: 8px;
          }
          .info_inputs {
            display: flex;
            justify-content: space-between;
            width: 100%;
            padding-top: 24px;
          }
          .full_name,
          .phone_number {
            width: 100%;
            border: 1px solid #cbcbcb;
            background-color: #f4f5f8;
            border-radius: 8px;
            padding: 19px;
          }
          .address_info {
            margin-top: 32px;
            display: flex;
            flex-direction: column;
          }
          .line_one,
          .line_two {
            width: 100%;
            border: 1px solid #cbcbcb;
            background-color: #f4f5f8;
            border-radius: 8px;
            padding: 19px;
          }
          .line_one {
            margin-bottom: 20px;
          }
          .add_address {
            color: #aa222a;
            letter-spacing: 0.31px;
            font-weight: 600;
            font-size: 14px;
            text-align: right;
            margin-top: 20px;
          }
          .address_info_two {
            display: flex;
            justify-content: space-between;
            width: 100%;
            flex-flow: wrap;
            margin-top: 10px;
            margin-bottom: 32px;
          }
          .address_info_two > select {
            width: 33%;
            border-radius: 8px;
            border: 1px solid #cbcbcb;
            background-color: #f4f5f8;
            padding: 19px;
            outline: none;
            font-size: 16px;
            color: #394358;
          }
          .address_info_two > select:nth-child(-n + 2) {
            margin-right: 10px;
          }
          .effective_deli span {
            font-size: 14px;
            font-weight: 600;
            color: #394358;
          }
          .office_home {
            display: flex;
            justify-content: space-around;
            width: 100%;
            margin-top: 20px;
          }
          .office,
          .home {
            width: 100%;
            padding: 20px;
            border: 1px solid #cbcbcb;
            background-color: #f4f5f8;
            height: 97px;
            border-radius: 8px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            color: #394358;
          }
          .office i,
          .home i {
            font-size: 32px;
          }
          .home {
            margin: 0 auto;
          }
          .office span,
          .home span {
            font-size: 16px;
            letter-spacing: 0.87px;
            font-weight: 600;
            padding-top: 8px;
          }
          .office {
            margin-right: 10px;
          }
          .close_btn {
            width: 40%;
            float: right;
            margin-top: 32px;
            margin-bottom: 32px;
            border-radius: 4px;
            border: 1px solid #aa222a;
            background-color: #ffffff;
            text-align: center;
            padding: 14px;
          }
          .close_btn a {
            cursor: pointer;
            outline: none;
            letter-spacing: 0.31px;
            font-weight: 600;
            font-size: 14px;
            color: #aa222a;
          }
          .save_btn {
            width: 40%;
            margin-left: 8px;
            float: right;
            margin-top: 32px;
            margin-bottom: 32px;
          }
          .save_btn button {
            cursor: pointer;
            border-radius: 4px;
            background-color: #aa222a;
            border: none;
            outline: none;
            width: 100%;
            padding: 16px;
            letter-spacing: 0.31px;
            font-weight: 600;
            font-size: 14px;
            color: #fff;
          }
          ::placeholder {
            opacity: 0.4;
            font-size: 16px;
            color: #394358;
          }

          @media (max-width: 876px) {
            .info_inputs {
              flex-direction: column;
            }
            .input {
              width: 100%;
              max-width: 100%;
            }
            .dropdown_input {
              margin: 10px 0;
            }
            .phone_number {
              margin-left: 0;
              margin-top: 32px;
            }
          }
          @media (max-width: 476px) {
            .office_home {
              flex-direction: column;
              justfiy-content: center;
            }
            .custom-select {
              width: 100%;
              display: inline-block;
            }
            .dropdown_input {
              max-width: 100%;
            }
            .township_ward {
              width: 100%;
            }
            .home_ctn,
            .office_ctn {
              width: 100%;
            }
            .office_ctn {
              padding-left: 0;
              margin-top: 10px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default DeliveryInfo;
