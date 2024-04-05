import styled from 'styled-components/native'

const PostView = styled.View`
  flex-direction: row;
  padding: 15px;
  border-bottom-width: 1px;
  border-bottom-color: rgba(0, 0, 0, 0.1);
  border-bottom-style: solid;
`;
const PostDetails = styled.View`
  flex: 1;
  justify-content: center;
`
const PostImage = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 12px;
  margin-right: 12px;
`

const PostTitle = styled.Text` 
  font-size: 17px;
  font-weight: 700;
`
const PostDate = styled.Text`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.4);
  margin-top: 2px;
`
const truncateTitle = (title) => {
  if(title.length >= 50) {
    return title.substring(0, 50) + '...'
  }
  return title
}

export const Post = ({ title, date, image }) => {
    return (
        <PostView>
            <PostImage source={{ uri: image }} />
            <PostDetails>
                <PostTitle>{truncateTitle(title)}</PostTitle>
                <PostDate>{date}</PostDate>
            </PostDetails>
        </PostView>
    )
}