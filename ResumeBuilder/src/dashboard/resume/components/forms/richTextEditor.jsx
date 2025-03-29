import React, { useContext, useState } from 'react'
import { Brain, LoaderCircle } from 'lucide-react';
import { EditorProvider,Editor,BtnBold,BtnBulletList,BtnClearFormatting,BtnItalic,BtnLink,BtnNumberedList,BtnRedo,BtnStrikeThrough,BtnStyles,BtnUnderline,BtnUndo,HtmlButton,Separator,Toolbar,} from 'react-simple-wysiwyg';
import { ResumeInfoContext } from '../../../../context/ResumeInfoContext';
import { AIchatSession } from '../../../../../service/AiModel'; // Corrected import
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Biohazard } from 'lucide-react';
const PROMPT = 'For the position "{title}", generate 7-10 detailed bullet points highlighting key responsibilities and achievements. Format the response as an HTML unordered list (<ul><li>). Each bullet point should:\n- Start with a strong action verb\n- Include metrics/numbers when possible\n- Highlight specific skills and technologies used\n- Demonstrate impact and results\nPlease provide the bullet points directly in HTML format without any experience level headers or JSON structure.';


export default function CustomEditor({ onRichTextEditorChange, index }) {
  const [value, setValue] = useState();
  const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext)
  const [loading,setLoading]=useState(false);

  const GenerateSummeryFromAI = async () => {
    if (!resumeInfo?.experience || !resumeInfo.experience[index]?.title) {
      toast('Please Add Position Title');
      return;
    }
    setLoading(true);
    const prompt = PROMPT.replace('{title}', resumeInfo.experience[index].title);

    try {
      const result = await AIchatSession.sendMessage(prompt);
      const resp = await result.response.text();
      setValue(resp.replace('[', '').replace(']', ''));
    } catch (error) {
      console.error('Error generating summary from AI:', error);
      toast('Failed to generate summary from AI');
    } finally {
      setLoading(false);
    }
  };

  function onChange(e) {
    setValue(e.target.value);
    onRichTextEditorChange(e)
  }

  return (
    <div>
      <div className='flex justify-between my-2'>
        <label className='text-xs'>Summery</label>
        <Button variant="outline" size="sm" 
        onClick={GenerateSummeryFromAI}
        disabled={loading}
        className="border-blue-500 text-blue-500">
          {loading?
          <LoaderCircle className='animate-spin'/>:  
          <>
           <Biohazard />  Generate from AI 
           </>
        }
         </Button>
      </div>

    <EditorProvider>
      <Editor value={value} onChange={onChange}>
        <Toolbar>
        <BtnUndo />
          <BtnRedo />
          <Separator />
          <BtnBold />
          <BtnItalic />
          <BtnUnderline />
          <BtnStrikeThrough />
          <Separator />
          <BtnNumberedList />
          <BtnBulletList />
          <Separator />
          <BtnLink />
          <BtnClearFormatting />
          <HtmlButton />
          <Separator />
          <BtnStyles />
        </Toolbar>
      </Editor>
    </EditorProvider>
    </div>
  );
}

