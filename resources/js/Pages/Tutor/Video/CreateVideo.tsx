import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { useForm, useRemember } from '@inertiajs/react';

import FakeTextInput from '@/Components/FakeTextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import Select from '@/Components/Select';
import { Language, Subject } from '@/types/index';
import { useRef, useState } from 'react';
import TextArea from '@/Components/TextArea';

import Uppy from '@uppy/core';
import { Dashboard as UppyDashboard } from '@uppy/react';

import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';
import GoldenRetriever from '@uppy/golden-retriever';

interface FormData {
  title: string;
  subject_id: number | "";
  language_id: number | "";
  description: string;
}

interface Props {
  meta: {
    subjects: Subject[]
    languages: Language[]
  },
  auth: any
}

export function CreateVideo({ meta, auth }: Props) {
  const [isSidebarCollapsed, setSidebarCollapsed] = useRemember(false, "dashboardSidebarCollapsed");
 	const [uppy] = useState(() => new Uppy().use(GoldenRetriever, { serviceWorker: true }));

  const selectSubjectRef = useRef<any>(null);
  const selectLanguageRef = useRef<any>(null);

  const defaultSubject = auth?.user?.primary_subject;
  const defaultLanguage = auth?.user?.primary_language;

  const { data, setData, post, processing, errors, reset } = useForm<FormData>({
      title: '',
      subject_id: defaultSubject?.id,
      language_id: defaultLanguage?.id,
      description: ''
  });

  const toggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

  const selectSubjectsOptions = meta?.subjects?.map((subject) => ({
    value: subject.id, label: subject.name
  }));
  const selectedSubjectLabel = selectSubjectsOptions.find((sub) => sub.value == data.subject_id)?.label;
  const onSelectSubject = (id: unknown) => {
    if (id == null) {
      selectSubjectRef?.current?.clearValue();
      setData("subject_id", "");
    }
    else setData("subject_id", parseInt(id as string ?? null))
  }

  const selectLanguageOptions = meta?.languages?.map((language) => ({
    value: language.id, label: language.name
  }));
  const selectedLanguageLabel = selectLanguageOptions.find((lang) => lang.value == data.language_id)?.label;
  const onSelectLanguage = (id: unknown) => {
    if (id == null) {
      selectLanguageRef?.current?.clearValue();
      setData("language_id", "");
    }
    else setData("language_id", parseInt(id as string ?? null))
  }

  console.log("form: ", data);



  return (
    <DashboardLayout activeLink='#video' isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar}>
      <main
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isSidebarCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded'
        }`}
      >
        <div className="p-8 flex w-full gap-2">
          <h1 className="text-3xl">Create Video</h1>
        </div>

        <div className="mx-8 h-full min-w-20 flex flex-col gap-8 max-w-7xl ">
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            <div className="w-full h-full flex flex-col">
              <InputLabel htmlFor="title" value="Title" />
              <TextInput
                id="title"
                type="text"
                name="title"
                value={data.title}
                className="mt-1 block w-full"
                autoComplete="name"
                onChange={(e) => setData('title', e.target.value)}
                
                required
              />
            </div>
            <div className="w-full h-full flex flex-col">
              <InputLabel htmlFor="subject_id" value="Subject" />
              <FakeTextInput variant='light' className="mt-1">
                <Select
                  ref={selectSubjectRef}
                  value={{ value: data.subject_id, label: selectedSubjectLabel }}
                  onChange={onSelectSubject}
                  name="subject_id"
                  options={selectSubjectsOptions}
                />
              </FakeTextInput>
            </div>
            <div className="w-full h-full flex flex-col">
              <InputLabel htmlFor="language_id" value="Language" />
              <FakeTextInput variant='light' className="mt-1">
                <Select
                  ref={selectLanguageRef}
                  value={{ value: data.language_id, label: selectedLanguageLabel }}
                  onChange={onSelectLanguage}
                  name="language_id"
                  options={selectLanguageOptions}
                />
              </FakeTextInput>
            </div>
            <div className="hidden 2xl:block"></div>
            <div className="w-full h-12 justify-center self-end hidden xl:flex xl:justify-end">
              <PrimaryButton className="w-full" disabled={processing}>
                <h1>Create Draft</h1>
              </PrimaryButton>
            </div>
          </div>
          <div className="w-full h-full flex flex-col">
            <InputLabel htmlFor="description" value="Description" />
            <TextArea
              id="description"
              name="description"
              value={data.description}
              className="mt-1 block w-full"
              onChange={(e) => setData('description', e.target.value)}
              
            />
          </div>
          <div className="w-full h-full flex flex-col gap-2">
            <InputLabel htmlFor="video_upload" value="Upload Video" />
            <UppyDashboard uppy={uppy} />
          </div>

        </div>
      </main>
    </DashboardLayout>
  );
}

export default CreateVideo;
