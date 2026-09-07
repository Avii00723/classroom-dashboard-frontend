import { Breadcrumb } from '@/components/refine-ui/layout/breadcrumb'
import { CreateView } from '@/components/refine-ui/views/create-view'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { useBack } from '@refinedev/core'
import React from 'react'
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import { classSchema } from '@/lib/schema'
import * as z from 'zod'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { subjects, teachers } from '@/providers/mock-data'
const Create = () => {
    const back=useBack();
    const form=useForm<z.infer<typeof classSchema>>({
        resolver:zodResolver(classSchema),
        defaultValues:{
            name:'',
            description:'',
            subjectId:0,
            teacherId:'',
            capacity:0,
            status:'active',
            bannerUrl:'',
            bannerCldPubId:'',
            inviteCode:'',
            schedules:[],
        },
    })
    const {handleSubmit, control, formState:{isSubmitting}}=form;
    const onSubmit = (values: z.infer<typeof classSchema>): void => {
        try {
            console.log(values)
        } catch (error) {
            console.log('Error creating new classes',error);
        }
    }

       
  return (
    <CreateView className="class-view">
        <Breadcrumb/>
        <h1 className='page-title'>Create a Class</h1>
        <div className="intro-row">
            <p>Provide the required information below to a class.</p>
            <Button onClick={back}>
                Go Back
            </Button>
        </div>
        <Separator/>
        <div className='my-4 flex items-center'>
            <Card className="class-form-card">
                <CardHeader className='relative z-10'>
                    <CardTitle className='text-2xl pb-0 font-bold'>
                        Fill out the form
                    </CardTitle>
                </CardHeader>
                <Separator/>
                <CardContent className='mt-7'>
                    <Form {...form}>
                        <form onSubmit={handleSubmit(onSubmit)}
                        className='space-y-5'>
                            <div className='space-y-3'>
                                <Label>
                                    Banner Image <span className='text-orange-600'></span>
                                    <p>Upload image widget</p>
                                </Label>
                            </div>
                            <FormField
                                control={control}
                                name="name"
                                render={({field})=>(
                                    <FormItem>
                                        <FormLabel>Class Name  <span className='text-orange-600'></span></FormLabel>
                                        <FormControl>
                                            <Input placeholder="Introduction to Biology - Section A"
                                            {...field}/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                        />
                        <div className='grid sm:grid-cols-2 gap-4'>
                            <FormField
                                control={control}
                                name="subjectId"
                                render={({field})=>(
                                    <FormItem>
                                        <FormLabel>Subject <span className='text-orange-600'></span></FormLabel>
                                        <FormControl>
                                           <Select onValueChange={(value)=> field.onChange(Number (value))} value={field ?.value?.toString()}>
                                            <FormControl>
                                                <SelectTrigger className='w-full'>
                                                    <SelectValue placeholder="Select a subject"/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {subjects.map(
                                                    (subject)=>(
                                                       <SelectItem
                                                       value={subject.id.toString()}>
                                                        {subject.name}
                                                        ({subject.code})
                                                       </SelectItem> 
                                                    )
                                                )}
                                            </SelectContent>
                                           </Select>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                        />
                        </div>
                        <FormField
                                control={control}
                                name="teacherId"
                                render={({field})=>(
                                    <FormItem>
                                        <FormLabel>Teacher <span className='text-orange-600'></span></FormLabel>
                                        <FormControl>
                                             <Select onValueChange={(value)=> field.onChange(Number (value))} value={field ?.value?.toString()}>
                                            <FormControl>
                                                <SelectTrigger className='w-full'>
                                                    <SelectValue placeholder="Select a teacher"/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {teachers.map(
                                                    (teacher)=>(
                                                       <SelectItem
                                                       value={teacher.id.toString()}>
                                                        {teacher.name}
                                                       </SelectItem> 
                                                    )
                                                )}
                                            </SelectContent>
                                           </Select>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                        />
                           <Button type="submit">Submit</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    </CreateView>

  )
}

export default Create