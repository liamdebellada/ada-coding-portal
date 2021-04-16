import { Formik, Form, Field, ErrorMessage, FastField} from 'formik';
import * as Yup from 'yup'

import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import styles from '../../styles/adminForm.module.css'

import { gql, useMutation } from '@apollo/client';

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

const challengeSchema = Yup.object().shape({
    title: Yup.string().required('Required.'),
    description: Yup.string().required('Required.'),
    due: Yup.date().required('Required!'),
    teamSize: Yup.number().required('Required!'),
    languages: Yup.array().required('Required!')
})

const ChallengesForm = (props) => {

    const [updateChallenge, {error, data}] = useMutation(gql`

        mutation updateChallenge(
            $c: String
        ) {
            updateChallenge(challengeObject: $c)
        }
    `);

    return (
        <Formik
            innerRef={props.forwardedRef}
            initialValues={props.options}
            enableReinitialize={true}       
            validationSchema={challengeSchema}
            onSubmit={(values, { setSubmitting }) => {
                updateChallenge({variables: {c: JSON.stringify(values)}})
            }}
        >
       {({ values, setFieldValue }) => {
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
                    <DatePicker
                      selected={values.due}
                      className={`${styles.textInput} ${styles.lengthy}`}
                      dateFormat="yyyy-MM-dd"
                      name="due"
                      onChange={date => setFieldValue('due', date)}
                    />
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

    const [updateBadge, {data}] = useMutation(gql`
        mutation updateBadge($b: String) {
            updateBadge(badgeObject: $b)
        }
    `)

    const badgesSchema = Yup.object().shape({
        name: Yup.string().required('Required.'),
        description: Yup.string().required('Required.'),
        icon: Yup.string().required('Required!'),
        rank: Yup.number().required('Required!')    
    })

    return (
        <Formik
            innerRef={props.forwardedRef}
            initialValues={props.options}
            enableReinitialize={true}
            validationSchema={badgesSchema}
            onSubmit={(values, { setSubmitting }) => {
                updateBadge({variables: {b: JSON.stringify(values)}})
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

    const [updateLanguage, {data}] = useMutation(gql`
        mutation updateLanguage($l: String) {
            updateLanguage(languageObject: $l)
        }
    `)


    const languagesSchema = Yup.object().shape({
        name: Yup.string().required('Required.'),
        difficulty: Yup.number().required('Required.'),
        icon: Yup.string().required('Required!')
    })

    return (
        <Formik
            innerRef={props.forwardedRef}
            initialValues={props.options}
            enableReinitialize={true}
            validationSchema={languagesSchema}
            onSubmit={(values, { setSubmitting }) => {
                updateLanguage({variables: {l: JSON.stringify(values)}})
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