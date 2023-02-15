import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { injectIntl, intlShape } from "react-intl";
import messages from "../../i18n/messages";
import { LanguageContext } from "../../";

const ContactForm = () => {
  // componentDidMount() {
  //   const $ = window.$;

  //   // Get the form.
  //   var form = $("#contact-form");

  //   // Get the messages div.
  //   var formMessages = $(".form-messege");

  //   // Set up an event listener for the contact form.
  //   $(form).submit(function (e) {
  //     // Stop the browser from submitting the form.
  //     e.preventDefault();

  //     // Serialize the form data.
  //     var formData = $(form).serialize();

  //     // Submit the form using AJAX.
  //     $.ajax({
  //       type: "POST",
  //       url: $(form).attr("action"),
  //       data: formData,
  //     })
  //       .done(function (response) {
  //         // Make sure that the formMessages div has the 'success' class.
  //         $(formMessages).removeClass("error");
  //         $(formMessages).addClass("success");

  //         // Set the message text.
  //         $(formMessages).text(response);

  //         // Clear the form.
  //         $("#contact-form input,#contact-form textarea").val("");
  //       })
  //       .fail(function (data) {
  //         // Make sure that the formMessages div has the 'error' class.
  //         $(formMessages).removeClass("success");
  //         $(formMessages).addClass("error");

  //         // Set the message text.
  //         if (data.responseText !== "") {
  //           $(formMessages).text(data.responseText);
  //         } else {
  //           $(formMessages).text(
  //             "Oops! An error occured and your message could not be sent."
  //           );
  //         }
  //       });
  //   });
  // }

  let publicUrl = process.env.PUBLIC_URL + "/";
  const { locale } = useContext(LanguageContext);
  const texts = messages[locale];
  // console.log(texts);

  return (
    <div className="ltn__contact-message-area mb-120 mb--100">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="ltn__form-box contact-form-box box-shadow white-bg">
              <h4 className="title-2">
                <FormattedMessage id="page-contact-contact-us" />
              </h4>
              <form
                id="contact-form"
                action={publicUrl + "mail.php"}
                method="post"
              >
                <div className="row">
                  <div className="col-md-6">
                    <div className="input-item input-item-name ltn__custom-icon">
                      <FormattedMessage id={texts["page-contact-insert-name"]}>
                        {(msg) => (
                          <input
                            type="text"
                            name="name"
                            placeholder={`${msg}`}
                          />
                        )}
                      </FormattedMessage>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-item input-item-email ltn__custom-icon">
                      <FormattedMessage id={texts["page-contact-insert-email"]}>
                        {(msg) => (
                          <input
                            type="email"
                            name="email"
                            placeholder={`${msg}`}
                          />
                        )}
                      </FormattedMessage>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-item">
                      <select className="nice-select" name="service">
                        <FormattedMessage
                          id="page-contact-type"
                          tagName="option"
                        />
                        <FormattedMessage
                          id="page-contact-home-rental"
                          tagName="option"
                        />
                        <FormattedMessage
                          id="page-contact-property-management"
                          tagName="option"
                        />
                        <FormattedMessage
                          id="page-contact-resolve-conflict"
                          tagName="option"
                        />
                        <FormattedMessage
                          id="page-contact-others"
                          tagName="option"
                        />
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-item input-item-phone ltn__custom-icon">
                      <FormattedMessage id={texts["page-contact-insert-phone"]}>
                        {(msg) => (
                          <input
                            type="text"
                            name="phone"
                            placeholder={`${msg}`}
                          />
                        )}
                      </FormattedMessage>
                    </div>
                  </div>
                </div>
                <div className="input-item input-item-textarea ltn__custom-icon">
                  <FormattedMessage id={texts["page-contact-write-message"]}>
                    {(msg) => (
                      <textarea
                        name="message"
                        placeholder={`${msg}`}
                        defaultValue={""}
                      />
                    )}
                  </FormattedMessage>
                </div>
                <p>
                  <label className="input-info-save mb-0">
                    <input type="checkbox" name="agree" />{" "}
                    <FormattedMessage id="page-contact-store-data" />
                  </label>
                </p>
                <div className="btn-wrapper mt-0">
                  <button
                    className="btn theme-btn-1 btn-effect-1 text-uppercase"
                    type="submit"
                  >
                    <FormattedMessage id="page-contact-send-question" />
                  </button>
                </div>
                <p className="form-messege mb-0 mt-20" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
