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
            enableReinitialize={true}
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
                            <select className={styles.selectInput} {...field} multiple>
                                {props.options && props.options.languages && props.options.languages.map((lang) => (
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

const BadgesForm = (props) => {
    return (
        <Formik
            innerRef={props.forwardedRef}
            initialValues={props.options}
            enableReinitialize={true}
            onSubmit={(values, { setSubmitting }) => {
                console.log("submitting badeges")
                console.log(values)
            }}
        >
       {({ values, isSubmitting }) => {
           return (
                <Form className={styles.formLayout}>
                    <div className={styles.formItem}>
                        <label>Name</label>
                        <Field type="text" name="name" component={StyledInput}/>
                        <ErrorMessage name="name" component="div" />
                    </div>
                    <div className={styles.formItem}>
                        <label>Description</label>
                        <Field type="text" name="description" component={StyledTA}/>
                        <ErrorMessage name="description" component="div" />
                    </div>
                    <div className={styles.formItem}>
                        <label>Icon</label>
                        <Field type="text" name="icon" component={StyledInput}/>
                        <ErrorMessage name="icon" component="div" />
                    </div>
                    <div className={styles.formItem}>
                        <label>Rank</label>
                        <Field type="text" name="rank" component={StyledInput}/>
                        <ErrorMessage name="rank" component="div" />
                    </div>
                </Form>
           )
       }}
       </Formik>
    )
}

const LanguagesForm = (props) => {
    return (
        <Formik
            innerRef={props.forwardedRef}
            initialValues={props.options}
            enableReinitialize={true}
            onSubmit={(values, { setSubmitting }) => {
                console.log("submitting langs")
                console.log(values)
            }}
        >
       {({ values, isSubmitting }) => {
           return (
                <Form className={styles.formLayout}>
                    <div className={styles.formItem}>
                        <label>Name</label>
                        <Field type="text" name="name" component={StyledInput}/>
                        <ErrorMessage name="name" component="div" />
                    </div>
                    <div className={styles.formItem}>
                        <label>Difficulty</label>
                        <Field type="text" name="difficulty" component={StyledInput}/>
                        <ErrorMessage name="difficulty" component="div" />
                    </div>
                    <div className={styles.formItem}>
                        <label>Icon</label>
                        <Field type="text" name="icon" component={StyledInput}/>
                        <ErrorMessage name="icon" component="div" />
                    </div>
                </Form>
           )
       }}
       </Formik>
    )
}

export { ChallengesForm, BadgesForm, LanguagesForm }