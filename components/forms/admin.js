import { Formik, Form, Field, ErrorMessage, FastField} from 'formik';
import styles from '../../styles/adminForm.module.css'

const StyledInput = ({ field, form, ...props }) => {
    return (
        <input {...field} {...props} className={styles.textInput} />
    )
}

const StyledTA = ({ field, form, ...props }) => {
    return (
        <textarea className={`${styles.textInput} ${styles.textArea}`} {...field} {...props}>

        </textarea>
    )
}

const ChallengesForm = (props) => {
    return (
        <Formik
            innerRef={props.forwardedRef}
            initialValues={props.options}
            onSubmit={(values, { setSubmitting }) => {
                console.log("submitting")
                console.log(values)
            }}
        >
       {({ values, isSubmitting }) => {
           return (
            <Form className={styles.formLayout}>
                <div className={styles.formItem}>
                    <label>Title</label>
                    <Field type="text" name="title" component={StyledInput}/>
                    <ErrorMessage name="title" component="div" />
                </div>
                <div className={styles.formItem}>
                    <label>Description</label>
                    <Field type="text" name="description" component={StyledTA}/>
                    <ErrorMessage name="description" component="div" />
                </div>
                <div className={styles.formItem}>
                    <label>Due</label>
                    <Field type="date" name="due" component={StyledInput}/>
                    <ErrorMessage name="due" component="div" />
                </div>
                <div className={styles.formItem}>
                    <label>Team size</label>
                    <Field type="number" name="teamSize" component={StyledInput}/>
                    <ErrorMessage name="teamSize" component="div" />
                </div>
                <div className={styles.formItem}>
                    <label>Languages</label>
                    <FastField name="languages" multiple={true}>
                    {({ field, form, meta }) => {
                        return (
                            <select size={props.options.languages.length} className={styles.selectInput} {...field} multiple>
                                {props.options.languages.map((lang) => (
                                    <option key={lang} value={lang}>{lang}</option>
                                ))}
                            </select>
                        )
                    }}
                    </FastField>
                    <ErrorMessage name="languages" component="div" />
                </div>
            </Form>
        )}}
        </Formik>
    )
}


export { ChallengesForm }